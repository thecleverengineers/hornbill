-- First, remove any existing improperly created user
DELETE FROM auth.users WHERE email = 'thecleverengineers@gmail.com';

-- Note: Superadmin user must be created through Supabase Dashboard or Admin API
-- Cannot directly insert into auth.users table with proper authentication setup
-- The user needs to be created via:
-- 1. Supabase Dashboard > Authentication > Users > Create User
-- 2. Email: thecleverengineers@gmail.com
-- 3. Password: Kites@123
-- 4. Then update their profile role to superadmin

-- Ensure profile trigger exists for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (new.id, new.email, 'user')
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$;

-- Create trigger if it doesn't exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create function to set superadmin role for specific email
CREATE OR REPLACE FUNCTION public.set_superadmin_role()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.profiles 
  SET role = 'superadmin' 
  WHERE email = 'thecleverengineers@gmail.com';
END;
$$;