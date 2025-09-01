-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

-- Create function to handle new user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (new.id, new.email, 'user');
  RETURN new;
END;
$$;

-- Create trigger for new user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create admin_users table for admin management
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  created_by UUID NOT NULL REFERENCES auth.users,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Policies for admin_users
CREATE POLICY "Superadmins can manage admin users" 
ON public.admin_users 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'superadmin'
  )
);

-- Add trigger to update profiles timestamp
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();