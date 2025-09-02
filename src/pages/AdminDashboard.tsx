import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { LogOut, Music, Eye, Check, X, Clock, Upload, ImageIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VisibilityManager } from "@/components/admin/VisibilityManager";
import { SEOManager } from "@/components/admin/SEOManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BandRegistration {
  id: string;
  band_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  genre: string;
  members_count: number;
  bio: string;
  video_url: string;
  band_photo_url: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  youtube_url: string | null;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState<BandRegistration[]>([]);
  const [selectedRegistration, setSelectedRegistration] = useState<BandRegistration | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentLogo, setCurrentLogo] = useState<string | null>(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchRegistrations();
    fetchCurrentLogo();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate('/login');
      return;
    }

    // Any authenticated user can access the dashboard
  };

  const fetchRegistrations = async () => {
    const { data, error } = await supabase
      .from('band_registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error("Failed to fetch registrations");
    } else {
      setRegistrations(data || []);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    setLoading(true);
    const { error } = await supabase
      .from('band_registrations')
      .update({ status })
      .eq('id', id);

    if (error) {
      toast.error("Failed to update status");
    } else {
      toast.success(`Status updated to ${status}`);
      fetchRegistrations();
      setSelectedRegistration(null);
    }
    setLoading(false);
  };

  const fetchCurrentLogo = async () => {
    const { data } = await supabase
      .from('site_settings')
      .select('setting_value')
      .eq('setting_key', 'site_logo')
      .single();
    
    if (data && data.setting_value) {
      setCurrentLogo(data.setting_value);
    }
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingLogo(true);

    try {
      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('band-photos')
        .upload(`logos/${fileName}`, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('band-photos')
        .getPublicUrl(`logos/${fileName}`);

      // Update or insert site_settings
      const { error: settingsError } = await supabase
        .from('site_settings')
        .upsert({
          setting_key: 'site_logo',
          setting_value: publicUrl
        }, {
          onConflict: 'setting_key'
        });

      if (settingsError) throw settingsError;

      setCurrentLogo(publicUrl);
      toast.success("Logo updated successfully");
    } catch (error) {
      console.error('Error uploading logo:', error);
      toast.error("Failed to upload logo");
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "secondary",
      approved: "default",
      rejected: "destructive",
    };
    
    const icons = {
      pending: <Clock className="mr-1 h-3 w-3" />,
      approved: <Check className="mr-1 h-3 w-3" />,
      rejected: <X className="mr-1 h-3 w-3" />,
    };

    return (
      <Badge variant={variants[status] || "outline"}>
        {icons[status as keyof typeof icons]}
        {status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Music className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="registrations" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="registrations">Band Registrations</TabsTrigger>
            <TabsTrigger value="visibility">Content Visibility</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="logo">Site Logo</TabsTrigger>
          </TabsList>

          <TabsContent value="registrations">
            <Card>
              <CardHeader>
                <CardTitle>Band Registration Submissions</CardTitle>
                <CardDescription>
                  Review and manage band registration applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Band Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Genre</TableHead>
                        <TableHead>Members</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {registrations.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center text-muted-foreground">
                            No registrations found
                          </TableCell>
                        </TableRow>
                      ) : (
                        registrations.map((registration) => (
                          <TableRow key={registration.id}>
                            <TableCell className="font-medium">
                              {registration.band_name}
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="text-sm">{registration.contact_name}</div>
                                <div className="text-xs text-muted-foreground">
                                  {registration.contact_email}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{registration.genre}</TableCell>
                            <TableCell>{registration.members_count}</TableCell>
                            <TableCell>{getStatusBadge(registration.status)}</TableCell>
                            <TableCell>
                              {new Date(registration.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedRegistration(registration)}
                              >
                                <Eye className="mr-1 h-4 w-4" />
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="visibility">
            <VisibilityManager />
          </TabsContent>

          <TabsContent value="seo">
            <SEOManager />
          </TabsContent>

          <TabsContent value="logo">
            <Card>
              <CardHeader>
                <CardTitle>Site Logo Management</CardTitle>
                <CardDescription>
                  Upload and manage the site logo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentLogo && (
                    <div>
                      <Label>Current Logo</Label>
                      <img 
                        src={currentLogo} 
                        alt="Site Logo" 
                        className="h-16 object-contain mt-2"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="logo-upload">Upload New Logo</Label>
                    <Input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      disabled={uploadingLogo}
                    />
                    {uploadingLogo && (
                      <p className="text-sm text-muted-foreground">Uploading...</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog
          open={!!selectedRegistration}
          onOpenChange={() => setSelectedRegistration(null)}
        >
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedRegistration?.band_name}</DialogTitle>
              <DialogDescription>
                Registration details and actions
              </DialogDescription>
            </DialogHeader>
            {selectedRegistration && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Contact Name</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedRegistration.contact_name}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedRegistration.contact_email}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedRegistration.contact_phone}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Genre</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedRegistration.genre}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Members</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedRegistration.members_count}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Status</label>
                    <div className="mt-1">
                      {getStatusBadge(selectedRegistration.status)}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Bio</label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedRegistration.bio}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium">Links</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedRegistration.video_url && (
                      <a
                        href={selectedRegistration.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        Performance Video
                      </a>
                    )}
                    {selectedRegistration.instagram_url && (
                      <a
                        href={selectedRegistration.instagram_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        Instagram
                      </a>
                    )}
                    {selectedRegistration.facebook_url && (
                      <a
                        href={selectedRegistration.facebook_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        Facebook
                      </a>
                    )}
                    {selectedRegistration.youtube_url && (
                      <a
                        href={selectedRegistration.youtube_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        YouTube
                      </a>
                    )}
                  </div>
                </div>

                {selectedRegistration.band_photo_url && (
                  <div>
                    <label className="text-sm font-medium">Band Photo</label>
                    <img
                      src={selectedRegistration.band_photo_url}
                      alt={selectedRegistration.band_name}
                      className="mt-1 rounded-lg max-w-full h-auto"
                    />
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={() => updateStatus(selectedRegistration.id, 'approved')}
                    disabled={loading || selectedRegistration.status === 'approved'}
                    className="flex-1"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => updateStatus(selectedRegistration.id, 'rejected')}
                    disabled={loading || selectedRegistration.status === 'rejected'}
                    className="flex-1"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}