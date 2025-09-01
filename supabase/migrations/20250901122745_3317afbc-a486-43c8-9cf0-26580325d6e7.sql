-- Create band registrations table
CREATE TABLE public.band_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  band_name TEXT NOT NULL,
  genre TEXT NOT NULL,
  members_count INTEGER NOT NULL,
  bio TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  instagram_url TEXT,
  facebook_url TEXT,
  youtube_url TEXT,
  video_url TEXT NOT NULL,
  band_photo_url TEXT,
  terms_accepted BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.band_registrations ENABLE ROW LEVEL SECURITY;

-- Create policies (public can insert, admin can view all)
CREATE POLICY "Anyone can submit band registration" 
ON public.band_registrations 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Public can view their own registrations" 
ON public.band_registrations 
FOR SELECT 
USING (contact_email = current_setting('request.jwt.claims', true)::json->>'email');

-- Create storage bucket for band photos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('band-photos', 'band-photos', true);

-- Storage policies for band photos
CREATE POLICY "Anyone can upload band photos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'band-photos');

CREATE POLICY "Band photos are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'band-photos');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_band_registrations_updated_at
BEFORE UPDATE ON public.band_registrations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();