-- Create the superadmin user manually
-- First check if the user exists, if not create them
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, instance_id, aud, role)
SELECT 
  gen_random_uuid(),
  'thecleverengineers@gmail.com',
  crypt('Kites@123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated'
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'thecleverengineers@gmail.com'
);

-- Update the profile to superadmin role
UPDATE public.profiles 
SET role = 'superadmin' 
WHERE email = 'thecleverengineers@gmail.com';

-- Update RLS policy for band_registrations to allow admins to view all
DROP POLICY IF EXISTS "Public can view their own registrations" ON public.band_registrations;

CREATE POLICY "Users can view their own registrations" 
ON public.band_registrations 
FOR SELECT 
USING (
  contact_email = ((current_setting('request.jwt.claims'::text, true))::json ->> 'email'::text)
  OR EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('admin', 'superadmin')
  )
);

-- Allow admins to update band registrations
CREATE POLICY "Admins can update registrations" 
ON public.band_registrations 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('admin', 'superadmin')
  )
);