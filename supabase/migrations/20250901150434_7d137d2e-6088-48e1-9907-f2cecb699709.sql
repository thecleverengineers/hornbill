-- Ensure trigger to create profiles on new auth users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Ensure trigger to assign superadmin when matching email on profile insert
DROP TRIGGER IF EXISTS profiles_assign_superadmin_if_match ON public.profiles;
CREATE TRIGGER profiles_assign_superadmin_if_match
BEFORE INSERT ON public.profiles
FOR EACH ROW EXECUTE PROCEDURE public.assign_superadmin_if_match();

-- Backfill profiles for existing auth users
INSERT INTO public.profiles (id, email, role)
SELECT u.id, u.email, 'user'
FROM auth.users u
LEFT JOIN public.profiles p ON p.id = u.id
WHERE p.id IS NULL;

-- Ensure the configured superadmin email has superadmin role
UPDATE public.profiles 
SET role = 'superadmin'
WHERE email = 'theclverengineers@gmail.com';