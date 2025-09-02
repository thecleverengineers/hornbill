-- Create SEO settings table
CREATE TABLE public.seo_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_route TEXT NOT NULL UNIQUE,
  page_name TEXT NOT NULL,
  title TEXT,
  meta_description TEXT,
  keywords TEXT,
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  twitter_card TEXT DEFAULT 'summary_large_image',
  canonical_url TEXT,
  robots TEXT DEFAULT 'index, follow',
  structured_data JSONB,
  custom_meta JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view SEO settings" 
ON public.seo_settings 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage SEO settings" 
ON public.seo_settings 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'superadmin')
  )
);

-- Create trigger for updated_at
CREATE TRIGGER update_seo_settings_updated_at
BEFORE UPDATE ON public.seo_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default SEO settings for all pages
INSERT INTO public.seo_settings (page_route, page_name, title, meta_description, keywords, og_title, og_description)
VALUES 
  ('/', 'Home', 'Hornbill Music Festival 2025 - Nagaland''s Biggest Music Celebration', 'Experience the magic of Hornbill Music Festival 2025 in Nagaland. Join 200+ musicians, 16 tribes, and 50,000+ fans for 5 days of incredible music and culture.', 'hornbill music festival, nagaland music, indian music festival, northeast india festival, tribal music, rock festival india, indie music india', 'Hornbill Music Festival 2025', 'Join us for India''s most vibrant music festival in the hills of Nagaland'),
  
  ('/about', 'About', 'About TaFMA - Task Force for Music & Arts Nagaland', 'Learn about TaFMA (Task Force for Music & Arts), the organization behind Hornbill Music Festival, promoting and preserving Nagaland''s rich musical heritage.', 'TaFMA, Task Force Music Arts, Nagaland music organization, music promotion nagaland, arts culture nagaland', 'About TaFMA', 'Discover the organization preserving and promoting Nagaland''s musical heritage'),
  
  ('/artists', 'Artists', 'Featured Artists - Hornbill Music Festival 2025', 'Explore the incredible lineup of artists performing at Hornbill Music Festival 2025. From traditional Naga music to contemporary rock and indie bands.', 'hornbill festival artists, nagaland musicians, indian rock bands, indie artists india, tribal musicians', 'Artists - Hornbill Music Festival', 'Meet the incredible artists performing at Hornbill Music Festival 2025'),
  
  ('/events', 'Events', 'Events & Activities - Hornbill Music Festival 2025', 'Discover all events, workshops, and activities at Hornbill Music Festival 2025. Music performances, cultural exhibitions, food festivals, and more.', 'hornbill festival events, music workshops nagaland, cultural activities, festival schedule, music events india', 'Events - Hornbill Music Festival', 'Explore all events and activities at the festival'),
  
  ('/schedule', 'Schedule', 'Festival Schedule - Hornbill Music Festival 2025', 'Complete schedule and lineup for Hornbill Music Festival 2025. Plan your festival experience with our detailed day-by-day performance schedule.', 'hornbill festival schedule, performance timings, festival lineup 2025, music festival timetable', 'Schedule - Hornbill Music Festival', 'View the complete festival schedule and plan your experience'),
  
  ('/gallery', 'Gallery', 'Photo Gallery - Hornbill Music Festival', 'Browse through stunning photos and memories from Hornbill Music Festival. Experience the energy, culture, and celebration through our visual journey.', 'hornbill festival photos, nagaland festival gallery, music festival pictures, cultural photography india', 'Gallery - Hornbill Music Festival', 'Visual memories from India''s most vibrant music festival'),
  
  ('/auditions', 'Auditions', 'Band Auditions - Perform at Hornbill Music Festival 2025', 'Register your band for Hornbill Music Festival 2025. Submit your audition and get a chance to perform on India''s biggest northeastern music stage.', 'band auditions, music festival registration, perform at hornbill, band competition india, music auditions nagaland', 'Auditions - Hornbill Music Festival', 'Your chance to perform at India''s premier music festival'),
  
  ('/hmf', 'Hornbill Festival', 'Hornbill Music Festival - The Ultimate Music Experience', 'Hornbill Music Festival is Northeast India''s premier music celebration, bringing together diverse musical traditions and contemporary sounds in Nagaland.', 'hornbill music festival, nagaland festival, northeast music festival, indian music celebration, kisama heritage village', 'Hornbill Music Festival', 'Northeast India''s premier music celebration')
ON CONFLICT (page_route) DO NOTHING;

-- Create global SEO settings table
CREATE TABLE public.global_seo_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  site_name TEXT DEFAULT 'Hornbill Music Festival',
  site_tagline TEXT DEFAULT 'Where Culture Meets Sound',
  default_meta_description TEXT DEFAULT 'Experience the magic of Hornbill Music Festival in Nagaland - India''s most vibrant celebration of music and culture.',
  default_keywords TEXT DEFAULT 'hornbill music festival, nagaland, india music festival, northeast india, tribal music, rock festival',
  default_og_image TEXT,
  google_analytics_id TEXT,
  google_tag_manager_id TEXT,
  facebook_pixel_id TEXT,
  twitter_handle TEXT DEFAULT '@HornbillFest',
  facebook_app_id TEXT,
  verification_google TEXT,
  verification_bing TEXT,
  robots_txt TEXT DEFAULT 'User-agent: *\nAllow: /\nSitemap: https://hornbillmusicfestival.com/sitemap.xml',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.global_seo_settings ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view global SEO settings" 
ON public.global_seo_settings 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage global SEO settings" 
ON public.global_seo_settings 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'superadmin')
  )
);

-- Insert default global settings
INSERT INTO public.global_seo_settings (id)
VALUES (gen_random_uuid())
ON CONFLICT DO NOTHING;