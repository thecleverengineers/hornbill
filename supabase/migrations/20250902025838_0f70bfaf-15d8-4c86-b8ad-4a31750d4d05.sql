-- Create site_settings table to store logo and other settings
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Policies for site_settings
-- Anyone can view settings (public facing)
CREATE POLICY "Anyone can view site settings"
ON public.site_settings
FOR SELECT
USING (true);

-- Only authenticated users can update settings
CREATE POLICY "Authenticated users can update settings"
ON public.site_settings
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Only authenticated users can insert settings
CREATE POLICY "Authenticated users can insert settings"
ON public.site_settings
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Add trigger for updating updated_at
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default logo setting
INSERT INTO public.site_settings (setting_key, setting_value)
VALUES ('site_logo', '/lovable-uploads/9aec2285-37ce-4a70-99e5-a480ca3ec765.png');