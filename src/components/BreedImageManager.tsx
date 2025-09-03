import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Upload, Edit, Trash2, Eye } from "lucide-react";
import { ProductImageUpload } from "./ProductImageUpload";

interface BreedImage {
  id: string;
  breed_name: string;
  age_category: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

const breeds = [
  "Sonali",
  "Peruvidai Cross", 
  "Kadaknath",
  "Guineafowl",
  "Aseel Cross",
  "Fancy",
  "Giriraja",
  "Turkey",
  "Duck"
];

const ageCategories = ["1-day", "1-month", "1.5-month", "2-month"];

export const BreedImageManager = () => {
  const [breedImages, setBreedImages] = useState<BreedImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingImage, setEditingImage] = useState<BreedImage | null>(null);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchBreedImages();
  }, []);

  const fetchBreedImages = async () => {
    try {
      const { data, error } = await supabase
        .from('breed_images')
        .select('*')
        .order('breed_name')
        .order('age_category');

      if (error) throw error;
      setBreedImages(data || []);
    } catch (error) {
      console.error('Error fetching breed images:', error);
      toast({
        title: "Error",
        description: "Failed to fetch breed images",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  };

  const saveBreedImage = async () => {
    if (!selectedBreed || !selectedAge || !imageUrl) {
      toast({
        title: "Error",
        description: "Please fill all fields and upload an image",
        variant: "destructive",
      });
      return;
    }

    try {
      if (editingImage) {
        // Update existing image
        const { error } = await supabase
          .from('breed_images')
          .update({
            breed_name: selectedBreed,
            age_category: selectedAge,
            image_url: imageUrl
          })
          .eq('id', editingImage.id);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Breed image updated successfully",
        });
      } else {
        // Insert new image (will update if combination exists due to UNIQUE constraint)
        const { error } = await supabase
          .from('breed_images')
          .upsert({
            breed_name: selectedBreed,
            age_category: selectedAge,
            image_url: imageUrl
          }, {
            onConflict: 'breed_name,age_category'
          });

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Breed image saved successfully",
        });
      }

      resetForm();
      fetchBreedImages();
    } catch (error) {
      console.error('Error saving breed image:', error);
      toast({
        title: "Error",
        description: "Failed to save breed image",
        variant: "destructive",
      });
    }
  };

  const deleteBreedImage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this breed image?')) return;

    try {
      const { error } = await supabase
        .from('breed_images')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setBreedImages(prev => prev.filter(img => img.id !== id));
      toast({
        title: "Success",
        description: "Breed image deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting breed image:', error);
      toast({
        title: "Error",
        description: "Failed to delete breed image",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setSelectedBreed("");
    setSelectedAge("");
    setImageUrl("");
    setEditingImage(null);
    setShowAddDialog(false);
  };

  const startEdit = (image: BreedImage) => {
    setSelectedBreed(image.breed_name);
    setSelectedAge(image.age_category);
    setImageUrl(image.image_url);
    setEditingImage(image);
    setShowAddDialog(true);
  };

  if (loading) {
    return <div>Loading breed images...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-primary">Breed Images Management</CardTitle>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2" onClick={() => resetForm()}>
                <Upload className="h-4 w-4" />
                Add/Update Image
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingImage ? 'Edit Breed Image' : 'Add Breed Image'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="breed">Breed</Label>
                  <Select value={selectedBreed} onValueChange={setSelectedBreed}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select breed" />
                    </SelectTrigger>
                    <SelectContent>
                      {breeds.map((breed) => (
                        <SelectItem key={breed} value={breed}>
                          {breed}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="age">Age Category</Label>
                  <Select value={selectedAge} onValueChange={setSelectedAge}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select age category" />
                    </SelectTrigger>
                    <SelectContent>
                      {ageCategories.map((age) => (
                        <SelectItem key={age} value={age}>
                          {age}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Image Upload</Label>
                  <ProductImageUpload 
                    onImageChange={handleImageUpload}
                    currentImageUrl={imageUrl}
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={saveBreedImage} className="flex-1">
                    {editingImage ? 'Update' : 'Save'}
                  </Button>
                  <Button variant="outline" onClick={resetForm} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {breedImages.map((image) => (
            <Card key={image.id} className="overflow-hidden">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={image.image_url}
                  alt={`${image.breed_name} - ${image.age_category}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-3">
                <h4 className="font-semibold text-sm">{image.breed_name}</h4>
                <p className="text-xs text-muted-foreground">{image.age_category}</p>
                <div className="flex gap-1 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startEdit(image)}
                    className="flex-1"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(image.image_url, '_blank')}
                    className="flex-1"
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteBreedImage(image.id)}
                    className="flex-1 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {breedImages.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No breed images found. Add some images to get started.
          </div>
        )}
      </CardContent>
    </Card>
  );
};