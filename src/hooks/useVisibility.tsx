import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface VisibilitySetting {
  component_id: string;
  is_visible: boolean;
}

export const useVisibility = () => {
  const [visibilitySettings, setVisibilitySettings] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVisibilitySettings();
    
    // Subscribe to real-time updates
    const channel = supabase
      .channel('visibility-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'visibility_settings'
        },
        () => {
          fetchVisibilitySettings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchVisibilitySettings = async () => {
    try {
      const { data, error } = await supabase
        .from('visibility_settings')
        .select('component_id, is_visible');

      if (!error && data) {
        const settings: Record<string, boolean> = {};
        data.forEach((item: VisibilitySetting) => {
          settings[item.component_id] = item.is_visible;
        });
        setVisibilitySettings(settings);
      }
    } catch (error) {
      console.error('Error fetching visibility settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const isVisible = (componentId: string): boolean => {
    // If setting doesn't exist, default to visible
    return visibilitySettings[componentId] ?? true;
  };

  return { isVisible, loading };
};