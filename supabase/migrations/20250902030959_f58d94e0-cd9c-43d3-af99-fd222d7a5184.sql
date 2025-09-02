-- Update the existing logo URL to use the full Supabase storage URL
UPDATE public.site_settings
SET setting_value = 'https://pnpjrqvpzewtmldqkzad.supabase.co/storage/v1/object/public/band-photos/logos/default-logo.png'
WHERE setting_key = 'site_logo' 
AND setting_value LIKE '/lovable-uploads/%';

-- If no logo exists, insert a placeholder
INSERT INTO public.site_settings (setting_key, setting_value)
VALUES ('site_logo', null)
ON CONFLICT (setting_key) DO NOTHING;