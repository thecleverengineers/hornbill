-- Relax RLS for band_registrations to allow any authenticated user
DROP POLICY IF EXISTS "Admins can update registrations" ON public.band_registrations;
DROP POLICY IF EXISTS "Users can view their own registrations" ON public.band_registrations;

CREATE POLICY "Authenticated can view all registrations"
ON public.band_registrations
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated can update registrations"
ON public.band_registrations
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);