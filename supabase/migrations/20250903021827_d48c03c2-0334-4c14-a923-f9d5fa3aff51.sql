-- Create breed_images table for admin-configurable images
CREATE TABLE public.breed_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  breed_name TEXT NOT NULL,
  age_category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(breed_name, age_category)
);

-- Enable Row Level Security
ALTER TABLE public.breed_images ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Allow all authenticated users to view breed images" 
ON public.breed_images 
FOR SELECT 
USING (true);

CREATE POLICY "Allow authenticated users to manage breed images" 
ON public.breed_images 
FOR ALL 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_breed_images_updated_at
BEFORE UPDATE ON public.breed_images
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default breed images
INSERT INTO public.breed_images (breed_name, age_category, image_url) VALUES
('Sonali', '1-day', '/src/assets/sonali-chick.jpg'),
('Sonali', '1-month', '/src/assets/sonali-chick.jpg'),
('Sonali', '1.5-month', '/src/assets/sonali-chick.jpg'),
('Sonali', '2-month', '/src/assets/sonali-chick.jpg'),
('Peruvidai Cross', '1-day', '/src/assets/peruvidai-chick.jpg'),
('Peruvidai Cross', '1-month', '/src/assets/peruvidai-chick.jpg'),
('Peruvidai Cross', '1.5-month', '/src/assets/peruvidai-chick.jpg'),
('Peruvidai Cross', '2-month', '/src/assets/peruvidai-chick.jpg'),
('Kadaknath', '1-day', '/src/assets/kadaknath-chick.jpg'),
('Kadaknath', '1-month', '/src/assets/kadaknath-chick.jpg'),
('Kadaknath', '1.5-month', '/src/assets/kadaknath-chick.jpg'),
('Kadaknath', '2-month', '/src/assets/kadaknath-chick.jpg'),
('Guineafowl', '1-day', '/src/assets/guineafowl-chick.jpg'),
('Guineafowl', '1-month', '/src/assets/guineafowl-chick.jpg'),
('Guineafowl', '1.5-month', '/src/assets/guineafowl-chick.jpg'),
('Guineafowl', '2-month', '/src/assets/guineafowl-chick.jpg'),
('Aseel Cross', '1-day', '/src/assets/aseel-chick.jpg'),
('Aseel Cross', '1-month', '/lovable-uploads/29d8ff9b-3160-4b38-97e5-94a5ef37c3d9.png'),
('Aseel Cross', '1.5-month', '/lovable-uploads/c23eb216-f78a-40bc-809f-059b4a1b2953.png'),
('Aseel Cross', '2-month', '/lovable-uploads/c92e1175-fa30-49f1-9ab3-569f300b0bd0.png'),
('Fancy', '1-day', '/src/assets/fancy-chick.jpg'),
('Fancy', '1-month', '/src/assets/fancy-chick.jpg'),
('Fancy', '1.5-month', '/src/assets/fancy-chick.jpg'),
('Fancy', '2-month', '/src/assets/fancy-chick.jpg'),
('Giriraja', '1-day', '/src/assets/giriraja-chick.jpg'),
('Giriraja', '1-month', '/src/assets/giriraja-chick.jpg'),
('Giriraja', '1.5-month', '/src/assets/giriraja-chick.jpg'),
('Giriraja', '2-month', '/src/assets/giriraja-chick.jpg'),
('Turkey', '1-day', '/src/assets/turkey-chick.jpg'),
('Turkey', '1-month', '/src/assets/turkey-chick.jpg'),
('Turkey', '1.5-month', '/src/assets/turkey-chick.jpg'),
('Turkey', '2-month', '/src/assets/turkey-chick.jpg'),
('Duck', '1-day', '/src/assets/duck-chick.jpg'),
('Duck', '1-month', '/src/assets/duck-chick.jpg'),
('Duck', '1.5-month', '/src/assets/duck-chick.jpg'),
('Duck', '2-month', '/src/assets/duck-chick.jpg');