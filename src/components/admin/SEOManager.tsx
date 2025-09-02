import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Save, Globe, Search, Share2, Settings } from 'lucide-react';

interface SEOSettings {
  id: string;
  page_route: string;
  page_name: string;
  title: string | null;
  meta_description: string | null;
  keywords: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  twitter_card: string | null;
  canonical_url: string | null;
  robots: string | null;
}

interface GlobalSEOSettings {
  id: string;
  site_name: string | null;
  site_tagline: string | null;
  default_meta_description: string | null;
  default_keywords: string | null;
  default_og_image: string | null;
  google_analytics_id: string | null;
  google_tag_manager_id: string | null;
  facebook_pixel_id: string | null;
  twitter_handle: string | null;
  facebook_app_id: string | null;
  verification_google: string | null;
  verification_bing: string | null;
  robots_txt: string | null;
}

export function SEOManager() {
  const [seoSettings, setSeoSettings] = useState<SEOSettings[]>([]);
  const [globalSettings, setGlobalSettings] = useState<GlobalSEOSettings | null>(null);
  const [selectedPage, setSelectedPage] = useState<string>('/');
  const [currentSettings, setCurrentSettings] = useState<SEOSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSEOSettings();
    fetchGlobalSettings();
  }, []);

  useEffect(() => {
    if (seoSettings.length > 0) {
      const settings = seoSettings.find(s => s.page_route === selectedPage);
      setCurrentSettings(settings || null);
    }
  }, [selectedPage, seoSettings]);

  const fetchSEOSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('seo_settings')
        .select('*')
        .order('page_name');

      if (error) throw error;
      setSeoSettings(data || []);
    } catch (error) {
      console.error('Error fetching SEO settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to load SEO settings',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchGlobalSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('global_seo_settings')
        .select('*')
        .single();

      if (error) throw error;
      setGlobalSettings(data);
    } catch (error) {
      console.error('Error fetching global SEO settings:', error);
    }
  };

  const saveSEOSettings = async () => {
    if (!currentSettings) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('seo_settings')
        .update({
          title: currentSettings.title,
          meta_description: currentSettings.meta_description,
          keywords: currentSettings.keywords,
          og_title: currentSettings.og_title,
          og_description: currentSettings.og_description,
          og_image: currentSettings.og_image,
          twitter_card: currentSettings.twitter_card,
          canonical_url: currentSettings.canonical_url,
          robots: currentSettings.robots,
        })
        .eq('id', currentSettings.id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'SEO settings saved successfully',
      });
    } catch (error) {
      console.error('Error saving SEO settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to save SEO settings',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const saveGlobalSettings = async () => {
    if (!globalSettings) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('global_seo_settings')
        .update({
          site_name: globalSettings.site_name,
          site_tagline: globalSettings.site_tagline,
          default_meta_description: globalSettings.default_meta_description,
          default_keywords: globalSettings.default_keywords,
          default_og_image: globalSettings.default_og_image,
          google_analytics_id: globalSettings.google_analytics_id,
          google_tag_manager_id: globalSettings.google_tag_manager_id,
          facebook_pixel_id: globalSettings.facebook_pixel_id,
          twitter_handle: globalSettings.twitter_handle,
          facebook_app_id: globalSettings.facebook_app_id,
          verification_google: globalSettings.verification_google,
          verification_bing: globalSettings.verification_bing,
          robots_txt: globalSettings.robots_txt,
        })
        .eq('id', globalSettings.id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Global SEO settings saved successfully',
      });
    } catch (error) {
      console.error('Error saving global SEO settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to save global SEO settings',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading SEO settings...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO Management</CardTitle>
        <CardDescription>
          Manage search engine optimization settings for your website
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pages" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pages">Page SEO</TabsTrigger>
            <TabsTrigger value="global">Global Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="pages" className="space-y-4">
            <div>
              <Label htmlFor="page-select">Select Page</Label>
              <Select value={selectedPage} onValueChange={setSelectedPage}>
                <SelectTrigger id="page-select">
                  <SelectValue placeholder="Choose a page" />
                </SelectTrigger>
                <SelectContent>
                  {seoSettings.map((setting) => (
                    <SelectItem key={setting.id} value={setting.page_route}>
                      {setting.page_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {currentSettings && (
              <>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="title">Page Title</Label>
                    <Input
                      id="title"
                      value={currentSettings.title || ''}
                      onChange={(e) => setCurrentSettings({
                        ...currentSettings,
                        title: e.target.value
                      })}
                      placeholder="Enter page title (50-60 characters)"
                      maxLength={60}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      {currentSettings.title?.length || 0}/60 characters
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="meta-description">Meta Description</Label>
                    <Textarea
                      id="meta-description"
                      value={currentSettings.meta_description || ''}
                      onChange={(e) => setCurrentSettings({
                        ...currentSettings,
                        meta_description: e.target.value
                      })}
                      placeholder="Enter meta description (150-160 characters)"
                      maxLength={160}
                      rows={3}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      {currentSettings.meta_description?.length || 0}/160 characters
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="keywords">Keywords</Label>
                    <Textarea
                      id="keywords"
                      value={currentSettings.keywords || ''}
                      onChange={(e) => setCurrentSettings({
                        ...currentSettings,
                        keywords: e.target.value
                      })}
                      placeholder="Enter keywords separated by commas"
                      rows={2}
                    />
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Share2 className="h-5 w-5" />
                      Social Media (Open Graph)
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="og-title">OG Title</Label>
                        <Input
                          id="og-title"
                          value={currentSettings.og_title || ''}
                          onChange={(e) => setCurrentSettings({
                            ...currentSettings,
                            og_title: e.target.value
                          })}
                          placeholder="Title for social media sharing"
                        />
                      </div>

                      <div>
                        <Label htmlFor="og-description">OG Description</Label>
                        <Textarea
                          id="og-description"
                          value={currentSettings.og_description || ''}
                          onChange={(e) => setCurrentSettings({
                            ...currentSettings,
                            og_description: e.target.value
                          })}
                          placeholder="Description for social media sharing"
                          rows={2}
                        />
                      </div>

                      <div>
                        <Label htmlFor="og-image">OG Image URL</Label>
                        <Input
                          id="og-image"
                          value={currentSettings.og_image || ''}
                          onChange={(e) => setCurrentSettings({
                            ...currentSettings,
                            og_image: e.target.value
                          })}
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Search className="h-5 w-5" />
                      Advanced SEO
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="canonical-url">Canonical URL</Label>
                        <Input
                          id="canonical-url"
                          value={currentSettings.canonical_url || ''}
                          onChange={(e) => setCurrentSettings({
                            ...currentSettings,
                            canonical_url: e.target.value
                          })}
                          placeholder="https://example.com/page"
                        />
                      </div>

                      <div>
                        <Label htmlFor="robots">Robots Meta Tag</Label>
                        <Select 
                          value={currentSettings.robots || 'index, follow'}
                          onValueChange={(value) => setCurrentSettings({
                            ...currentSettings,
                            robots: value
                          })}
                        >
                          <SelectTrigger id="robots">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="index, follow">Index, Follow</SelectItem>
                            <SelectItem value="noindex, follow">No Index, Follow</SelectItem>
                            <SelectItem value="index, nofollow">Index, No Follow</SelectItem>
                            <SelectItem value="noindex, nofollow">No Index, No Follow</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={saveSEOSettings} 
                  disabled={saving}
                  className="w-full"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? 'Saving...' : 'Save Page SEO Settings'}
                </Button>
              </>
            )}
          </TabsContent>

          <TabsContent value="global" className="space-y-4">
            {globalSettings && (
              <>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="site-name">Site Name</Label>
                    <Input
                      id="site-name"
                      value={globalSettings.site_name || ''}
                      onChange={(e) => setGlobalSettings({
                        ...globalSettings,
                        site_name: e.target.value
                      })}
                      placeholder="Your website name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="site-tagline">Site Tagline</Label>
                    <Input
                      id="site-tagline"
                      value={globalSettings.site_tagline || ''}
                      onChange={(e) => setGlobalSettings({
                        ...globalSettings,
                        site_tagline: e.target.value
                      })}
                      placeholder="Your website tagline"
                    />
                  </div>

                  <div>
                    <Label htmlFor="default-description">Default Meta Description</Label>
                    <Textarea
                      id="default-description"
                      value={globalSettings.default_meta_description || ''}
                      onChange={(e) => setGlobalSettings({
                        ...globalSettings,
                        default_meta_description: e.target.value
                      })}
                      placeholder="Default description for pages without specific SEO"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="default-keywords">Default Keywords</Label>
                    <Textarea
                      id="default-keywords"
                      value={globalSettings.default_keywords || ''}
                      onChange={(e) => setGlobalSettings({
                        ...globalSettings,
                        default_keywords: e.target.value
                      })}
                      placeholder="Default keywords separated by commas"
                      rows={2}
                    />
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Analytics & Tracking
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="ga-id">Google Analytics ID</Label>
                        <Input
                          id="ga-id"
                          value={globalSettings.google_analytics_id || ''}
                          onChange={(e) => setGlobalSettings({
                            ...globalSettings,
                            google_analytics_id: e.target.value
                          })}
                          placeholder="G-XXXXXXXXXX"
                        />
                      </div>

                      <div>
                        <Label htmlFor="gtm-id">Google Tag Manager ID</Label>
                        <Input
                          id="gtm-id"
                          value={globalSettings.google_tag_manager_id || ''}
                          onChange={(e) => setGlobalSettings({
                            ...globalSettings,
                            google_tag_manager_id: e.target.value
                          })}
                          placeholder="GTM-XXXXXXX"
                        />
                      </div>

                      <div>
                        <Label htmlFor="fb-pixel">Facebook Pixel ID</Label>
                        <Input
                          id="fb-pixel"
                          value={globalSettings.facebook_pixel_id || ''}
                          onChange={(e) => setGlobalSettings({
                            ...globalSettings,
                            facebook_pixel_id: e.target.value
                          })}
                          placeholder="XXXXXXXXXXXXXXXXX"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Site Verification
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="google-verify">Google Search Console</Label>
                        <Input
                          id="google-verify"
                          value={globalSettings.verification_google || ''}
                          onChange={(e) => setGlobalSettings({
                            ...globalSettings,
                            verification_google: e.target.value
                          })}
                          placeholder="Verification code"
                        />
                      </div>

                      <div>
                        <Label htmlFor="bing-verify">Bing Webmaster Tools</Label>
                        <Input
                          id="bing-verify"
                          value={globalSettings.verification_bing || ''}
                          onChange={(e) => setGlobalSettings({
                            ...globalSettings,
                            verification_bing: e.target.value
                          })}
                          placeholder="Verification code"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="robots-txt">Robots.txt Content</Label>
                    <Textarea
                      id="robots-txt"
                      value={globalSettings.robots_txt || ''}
                      onChange={(e) => setGlobalSettings({
                        ...globalSettings,
                        robots_txt: e.target.value
                      })}
                      placeholder="User-agent: *&#10;Allow: /"
                      rows={5}
                      className="font-mono text-sm"
                    />
                  </div>
                </div>

                <Button 
                  onClick={saveGlobalSettings} 
                  disabled={saving}
                  className="w-full"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? 'Saving...' : 'Save Global SEO Settings'}
                </Button>
              </>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}