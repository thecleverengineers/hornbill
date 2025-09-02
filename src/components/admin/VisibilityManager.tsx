import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface VisibilitySetting {
  id: string;
  component_id: string;
  component_name: string;
  component_type: string;
  page: string;
  is_visible: boolean;
}

export function VisibilityManager() {
  const [settings, setSettings] = useState<VisibilitySetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComponentId, setNewComponentId] = useState('');
  const [newComponentName, setNewComponentName] = useState('');
  const [newComponentType, setNewComponentType] = useState('');
  const [newComponentPage, setNewComponentPage] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('visibility_settings')
        .select('*')
        .order('page', { ascending: true })
        .order('component_name', { ascending: true });

      if (error) throw error;
      setSettings(data || []);
    } catch (error) {
      console.error('Error fetching visibility settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to load visibility settings',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = async (id: string, currentState: boolean) => {
    try {
      const { error } = await supabase
        .from('visibility_settings')
        .update({ is_visible: !currentState })
        .eq('id', id);

      if (error) throw error;

      setSettings(prev => 
        prev.map(s => s.id === id ? { ...s, is_visible: !currentState } : s)
      );

      toast({
        title: 'Success',
        description: 'Visibility updated successfully',
      });
    } catch (error) {
      console.error('Error updating visibility:', error);
      toast({
        title: 'Error',
        description: 'Failed to update visibility',
        variant: 'destructive',
      });
    }
  };

  const addComponent = async () => {
    if (!newComponentId || !newComponentName || !newComponentType || !newComponentPage) {
      toast({
        title: 'Error',
        description: 'Please fill all fields',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('visibility_settings')
        .insert({
          component_id: newComponentId,
          component_name: newComponentName,
          component_type: newComponentType,
          page: newComponentPage,
          is_visible: true,
        })
        .select()
        .single();

      if (error) throw error;

      setSettings(prev => [...prev, data]);
      setNewComponentId('');
      setNewComponentName('');
      setNewComponentType('');
      setNewComponentPage('');

      toast({
        title: 'Success',
        description: 'Component added successfully',
      });
    } catch (error) {
      console.error('Error adding component:', error);
      toast({
        title: 'Error',
        description: 'Failed to add component',
        variant: 'destructive',
      });
    }
  };

  const deleteComponent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('visibility_settings')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSettings(prev => prev.filter(s => s.id !== id));

      toast({
        title: 'Success',
        description: 'Component deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting component:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete component',
        variant: 'destructive',
      });
    }
  };

  const groupedSettings = settings.reduce((acc, setting) => {
    if (!acc[setting.page]) {
      acc[setting.page] = [];
    }
    acc[setting.page].push(setting);
    return acc;
  }, {} as Record<string, VisibilitySetting[]>);

  if (loading) {
    return <div>Loading visibility settings...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Visibility Manager</CardTitle>
        <CardDescription>
          Control the visibility of components across the entire application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-4">
              <Plus className="h-4 w-4 mr-2" />
              Add Component
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Component</DialogTitle>
              <DialogDescription>
                Add a new component to manage its visibility
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="component-id">Component ID</Label>
                <Input
                  id="component-id"
                  value={newComponentId}
                  onChange={(e) => setNewComponentId(e.target.value)}
                  placeholder="e.g., hero-section"
                />
              </div>
              <div>
                <Label htmlFor="component-name">Component Name</Label>
                <Input
                  id="component-name"
                  value={newComponentName}
                  onChange={(e) => setNewComponentName(e.target.value)}
                  placeholder="e.g., Hero Section"
                />
              </div>
              <div>
                <Label htmlFor="component-type">Component Type</Label>
                <Select value={newComponentType} onValueChange={setNewComponentType}>
                  <SelectTrigger id="component-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="section">Section</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="div">Div</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="carousel">Carousel</SelectItem>
                    <SelectItem value="nav-item">Navigation Item</SelectItem>
                    <SelectItem value="page">Page</SelectItem>
                    <SelectItem value="button">Button</SelectItem>
                    <SelectItem value="links">Links</SelectItem>
                    <SelectItem value="stats">Stats</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="component-page">Page</Label>
                <Select value={newComponentPage} onValueChange={setNewComponentPage}>
                  <SelectTrigger id="component-page">
                    <SelectValue placeholder="Select page" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">Home</SelectItem>
                    <SelectItem value="navigation">Navigation</SelectItem>
                    <SelectItem value="global">Global</SelectItem>
                    <SelectItem value="pages">Pages</SelectItem>
                    <SelectItem value="about">About</SelectItem>
                    <SelectItem value="artists">Artists</SelectItem>
                    <SelectItem value="events">Events</SelectItem>
                    <SelectItem value="schedule">Schedule</SelectItem>
                    <SelectItem value="gallery">Gallery</SelectItem>
                    <SelectItem value="auditions">Auditions</SelectItem>
                    <SelectItem value="hmf">HMF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={addComponent} className="w-full">
                Add Component
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Tabs defaultValue="home" className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="navigation">Navigation</TabsTrigger>
            <TabsTrigger value="pages">Pages</TabsTrigger>
            <TabsTrigger value="global">Global</TabsTrigger>
          </TabsList>

          {Object.entries(groupedSettings).map(([page, pageSettings]) => (
            <TabsContent key={page} value={page} className="space-y-4">
              {pageSettings.map((setting) => (
                <div
                  key={setting.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    {setting.is_visible ? (
                      <Eye className="h-5 w-5 text-green-500" />
                    ) : (
                      <EyeOff className="h-5 w-5 text-red-500" />
                    )}
                    <div>
                      <Label className="text-base font-medium">
                        {setting.component_name}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Type: {setting.component_type} | ID: {setting.component_id}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Switch
                      checked={setting.is_visible}
                      onCheckedChange={() => toggleVisibility(setting.id, setting.is_visible)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteComponent(setting.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}