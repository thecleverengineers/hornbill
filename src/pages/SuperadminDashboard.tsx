import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Loader2, UserPlus, Trash2, LogOut, Shield } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface AdminUser {
  id: string;
  email: string;
  created_at: string;
}

export default function SuperadminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchAdminUsers();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate('/login');
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .maybeSingle();

    if (!profile || profile.role !== 'superadmin') {
      toast.error("Access denied. Superadmin only.");
      navigate('/');
    }
  };

  const fetchAdminUsers = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, created_at')
      .eq('role', 'admin')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error("Failed to fetch admin users");
    } else {
      setAdminUsers(data || []);
    }
  };

  const createAdminUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newAdminEmail,
        password: newAdminPassword,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`
        }
      });

      if (authError) {
        toast.error(authError.message);
        return;
      }

      if (authData.user) {
        // Update user role to admin
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ role: 'admin' })
          .eq('id', authData.user.id);

        if (profileError) {
          toast.error("Failed to set admin role");
        } else {
          toast.success("Admin user created successfully!");
          setNewAdminEmail("");
          setNewAdminPassword("");
          setDialogOpen(false);
          fetchAdminUsers();
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const deleteAdminUser = async (userId: string) => {
    if (!confirm("Are you sure you want to remove this admin?")) return;

    const { error: profileError } = await supabase
      .from('profiles')
      .update({ role: 'user' })
      .eq('id', userId);

    if (profileError) {
      toast.error("Failed to remove admin privileges");
    } else {
      toast.success("Admin privileges removed");
      fetchAdminUsers();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Superadmin Dashboard</h1>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Admin User Management</CardTitle>
              <CardDescription>Create and manage admin users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Create Admin User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Admin User</DialogTitle>
                      <DialogDescription>
                        Enter the email and password for the new admin user
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={createAdminUser} className="space-y-4">
                      <Input
                        type="email"
                        placeholder="Admin Email"
                        value={newAdminEmail}
                        onChange={(e) => setNewAdminEmail(e.target.value)}
                        required
                        disabled={loading}
                      />
                      <Input
                        type="password"
                        placeholder="Password"
                        value={newAdminPassword}
                        onChange={(e) => setNewAdminPassword(e.target.value)}
                        required
                        disabled={loading}
                        minLength={6}
                      />
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          "Create Admin"
                        )}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adminUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-muted-foreground">
                          No admin users found
                        </TableCell>
                      </TableRow>
                    ) : (
                      adminUsers.map((admin) => (
                        <TableRow key={admin.id}>
                          <TableCell>{admin.email}</TableCell>
                          <TableCell>
                            {new Date(admin.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => deleteAdminUser(admin.id)}
                            >
                              <Trash2 className="h-4 w-4" />
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
        </div>
      </div>
    </div>
  );
}