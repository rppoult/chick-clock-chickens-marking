-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true);

-- Create storage policies for product images
CREATE POLICY "Anyone can view product images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'product-images');

CREATE POLICY "Anyone can upload product images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Anyone can update product images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'product-images');

CREATE POLICY "Anyone can delete product images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'product-images');

-- Add image_url column to medicines table
ALTER TABLE public.medicines 
ADD COLUMN image_url TEXT;

-- Update user_roles table to make all users admin by default
ALTER TABLE public.user_roles 
ALTER COLUMN role SET DEFAULT 'admin'::app_role;

-- Create a function to automatically assign admin role to new users
CREATE OR REPLACE FUNCTION public.handle_new_user_admin()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'admin'::app_role);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically assign admin role
CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_admin();

-- Update RLS policies to allow everyone to manage medicines
DROP POLICY IF EXISTS "Admins can manage medicines" ON public.medicines;
DROP POLICY IF EXISTS "Everyone can view medicines" ON public.medicines;

CREATE POLICY "Everyone can manage medicines" 
ON public.medicines 
FOR ALL 
USING (true);

-- Update orders policies to allow everyone to view and manage
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
DROP POLICY IF EXISTS "Guest orders are viewable by admins only" ON public.orders;

CREATE POLICY "Everyone can view and manage orders" 
ON public.orders 
FOR ALL 
USING (true);