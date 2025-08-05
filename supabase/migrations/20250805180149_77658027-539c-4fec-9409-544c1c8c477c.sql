-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Create policies for categories
CREATE POLICY "Everyone can view categories" 
ON public.categories 
FOR SELECT 
USING (true);

CREATE POLICY "Everyone can manage categories" 
ON public.categories 
FOR ALL 
USING (true);

-- Add trigger for updated_at
CREATE TRIGGER update_categories_updated_at
BEFORE UPDATE ON public.categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some default categories
INSERT INTO public.categories (name, description) VALUES
('Poultry Medicine', 'Medicines and treatments for poultry'),
('Feed Supplements', 'Nutritional supplements for birds'),
('Vaccines', 'Vaccination products for poultry'),
('Equipment', 'Poultry farming equipment'),
('Disinfectants', 'Cleaning and disinfection products');