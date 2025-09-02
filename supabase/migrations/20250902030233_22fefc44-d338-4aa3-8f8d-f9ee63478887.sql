-- Create visibility settings table
CREATE TABLE public.visibility_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  component_id TEXT NOT NULL UNIQUE,
  component_name TEXT NOT NULL,
  component_type TEXT NOT NULL,
  page TEXT NOT NULL,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  updated_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.visibility_settings ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view visibility settings" 
ON public.visibility_settings 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can insert visibility settings" 
ON public.visibility_settings 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'superadmin')
  )
);

CREATE POLICY "Admins can update visibility settings" 
ON public.visibility_settings 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'superadmin')
  )
);

CREATE POLICY "Admins can delete visibility settings" 
ON public.visibility_settings 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'superadmin')
  )
);

-- Create trigger for updated_at
CREATE TRIGGER update_visibility_settings_updated_at
BEFORE UPDATE ON public.visibility_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default visibility settings for main components
INSERT INTO public.visibility_settings (component_id, component_name, component_type, page, is_visible)
VALUES 
  -- Homepage sections
  ('hero-section', 'Hero Section', 'section', 'home', true),
  ('hero-carousel', 'Hero Carousel', 'carousel', 'home', true),
  ('hero-stats', 'Festival Statistics', 'stats', 'home', true),
  ('featured-section', 'Featured Section', 'section', 'home', true),
  ('featured-artists', 'Featured Artists', 'cards', 'home', true),
  ('featured-events', 'Featured Events', 'cards', 'home', true),
  ('about-tafma', 'About TaFMA Section', 'section', 'home', true),
  ('sponsors-section', 'Sponsors Section', 'section', 'home', true),
  ('sponsors-logos', 'Sponsor Logos', 'images', 'home', true),
  
  -- Navigation items
  ('nav-home', 'Home Link', 'nav-item', 'navigation', true),
  ('nav-about', 'About Link', 'nav-item', 'navigation', true),
  ('nav-artists', 'Artists Link', 'nav-item', 'navigation', true),
  ('nav-events', 'Events Link', 'nav-item', 'navigation', true),
  ('nav-schedule', 'Schedule Link', 'nav-item', 'navigation', true),
  ('nav-gallery', 'Gallery Link', 'nav-item', 'navigation', true),
  ('nav-auditions', 'Auditions Link', 'nav-item', 'navigation', true),
  ('nav-hmf', 'HMF Link', 'nav-item', 'navigation', true),
  ('nav-register', 'Register Button', 'nav-item', 'navigation', true),
  
  -- Footer sections
  ('footer', 'Footer', 'section', 'global', true),
  ('footer-links', 'Footer Links', 'links', 'global', true),
  ('footer-social', 'Footer Social Media', 'links', 'global', true),
  
  -- Pages
  ('about-page', 'About Page', 'page', 'pages', true),
  ('artists-page', 'Artists Page', 'page', 'pages', true),
  ('events-page', 'Events Page', 'page', 'pages', true),
  ('schedule-page', 'Schedule Page', 'page', 'pages', true),
  ('gallery-page', 'Gallery Page', 'page', 'pages', true),
  ('auditions-page', 'Auditions Page', 'page', 'pages', true),
  ('hmf-page', 'HMF Page', 'page', 'pages', true)
ON CONFLICT (component_id) DO NOTHING;