import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ProductImageUpload } from './ProductImageUpload';

interface Medicine {
  id?: string;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category: string;
  manufacturer: string;
  image_url?: string;
}

interface ProductFormProps {
  medicine?: Medicine;
  onSuccess: () => void;
  onCancel: () => void;
}

export const ProductForm = ({ medicine, onSuccess, onCancel }: ProductFormProps) => {
  const [formData, setFormData] = useState<Medicine>({
    name: medicine?.name || '',
    description: medicine?.description || '',
    price: medicine?.price || 0,
    stock_quantity: medicine?.stock_quantity || 0,
    category: medicine?.category || '',
    manufacturer: medicine?.manufacturer || '',
    image_url: medicine?.image_url || '',
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (medicine?.id) {
        // Update existing medicine
        const { error } = await supabase
          .from('medicines')
          .update(formData)
          .eq('id', medicine.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Product updated successfully!",
        });
      } else {
        // Create new medicine
        const { error } = await supabase
          .from('medicines')
          .insert([formData]);

        if (error) throw error;

        toast({
          title: "Success", 
          description: "Product created successfully!",
        });
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "Error",
        description: "Failed to save product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof Medicine, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {medicine?.id ? 'Edit Product' : 'Add New Product'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="image">Product Image</Label>
            <ProductImageUpload
              currentImageUrl={formData.image_url || undefined}
              onImageChange={(url) => handleInputChange('image_url', url || '')}
              productId={medicine?.id}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹) *</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity *</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={formData.stock_quantity}
                onChange={(e) => handleInputChange('stock_quantity', parseInt(e.target.value) || 0)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="manufacturer">Manufacturer</Label>
              <Input
                id="manufacturer"
                value={formData.manufacturer}
                onChange={(e) => handleInputChange('manufacturer', e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-6">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Saving...' : (medicine?.id ? 'Update Product' : 'Create Product')}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};