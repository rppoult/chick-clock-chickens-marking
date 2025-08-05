import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, X } from 'lucide-react';

interface ProductImageUploadProps {
  currentImageUrl?: string;
  onImageChange: (url: string | null) => void;
  productId?: string;
}

export const ProductImageUpload = ({ 
  currentImageUrl, 
  onImageChange, 
  productId 
}: ProductImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      onImageChange(data.publicUrl);
      
      toast({
        title: "Success",
        description: "Image uploaded successfully!",
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const removeImage = async () => {
    if (currentImageUrl) {
      try {
        // Extract file path from URL
        const urlParts = currentImageUrl.split('/');
        const fileName = urlParts[urlParts.length - 1];
        const filePath = `products/${fileName}`;

        await supabase.storage
          .from('product-images')
          .remove([filePath]);

        onImageChange(null);
        
        toast({
          title: "Success",
          description: "Image removed successfully!",
        });
      } catch (error) {
        console.error('Error removing image:', error);
        toast({
          title: "Error",
          description: "Failed to remove image.",
          variant: "destructive",
        });
      }
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "File size must be less than 5MB.",
          variant: "destructive",
        });
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Error",
          description: "Please select an image file.",
          variant: "destructive",
        });
        return;
      }

      uploadImage(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading}
          className="hidden"
          id={`image-upload-${productId || 'new'}`}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById(`image-upload-${productId || 'new'}`)?.click()}
          disabled={uploading}
          className="flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          {uploading ? 'Uploading...' : 'Upload Image'}
        </Button>
        
        {currentImageUrl && (
          <Button
            type="button"
            variant="outline"
            onClick={removeImage}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Remove Image
          </Button>
        )}
      </div>
      
      {currentImageUrl && (
        <div className="relative w-full max-w-sm">
          <img
            src={currentImageUrl}
            alt="Product"
            className="w-full h-48 object-cover rounded-lg border"
          />
        </div>
      )}
    </div>
  );
};