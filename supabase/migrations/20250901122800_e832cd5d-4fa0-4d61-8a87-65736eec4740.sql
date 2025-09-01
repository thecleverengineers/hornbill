-- Fix the security warning by setting search_path for the function
DROP FUNCTION IF EXISTS public.update_updated_at_column() CASCADE;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate the trigger
CREATE TRIGGER update_band_registrations_updated_at
BEFORE UPDATE ON public.band_registrations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();