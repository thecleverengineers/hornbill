-- Ensure superadmin is auto-assigned when the specific email signs up
CREATE OR REPLACE FUNCTION public.assign_superadmin_if_match()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF NEW.email = 'theclverengineers@gmail.com' THEN
    NEW.role := 'superadmin';
  END IF;
  RETURN NEW;
END;
$$;

-- Create BEFORE INSERT trigger on profiles to assign role
DROP TRIGGER IF EXISTS profiles_assign_superadmin_if_match ON public.profiles;
CREATE TRIGGER profiles_assign_superadmin_if_match
BEFORE INSERT ON public.profiles
FOR EACH ROW
EXECUTE PROCEDURE public.assign_superadmin_if_match();

-- Harden previous helper by setting search_path
CREATE OR REPLACE FUNCTION public.set_superadmin_role()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles 
  SET role = 'superadmin' 
  WHERE email = 'theclverengineers@gmail.com';
END;
$$;