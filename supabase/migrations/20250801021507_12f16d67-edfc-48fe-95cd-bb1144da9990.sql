-- Update RLS policies to allow guest orders and ensure admin can see all orders

-- Drop existing policies for orders
DROP POLICY IF EXISTS "Users can insert their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;

-- Create new policies that support guest checkout
CREATE POLICY "Anyone can insert orders" ON public.orders
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Guest orders are viewable by admins only" ON public.orders
  FOR SELECT 
  USING (user_id IS NULL AND has_role(auth.uid(), 'admin'::app_role));

-- Ensure admins can view all orders (both user and guest orders)
CREATE POLICY "Admins can view all orders including guest orders" ON public.orders
  FOR SELECT 
  USING (has_role(auth.uid(), 'admin'::app_role));