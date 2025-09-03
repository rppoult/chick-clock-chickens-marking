import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Edit, Upload, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ProductImageUpload } from "@/components/ProductImageUpload";

interface BreedImage {
  id: string;
  breed_name: string;
  age_category: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

const BREEDS = [
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

const AGE_CATEGORIES = [
  "1-day",
  "1-month", 
  "1.5-month",
  "2-month"
];

export const BreedImageManager = () => {
  const [breedImages, setBreedImages] = useState<BreedImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingImage, setEditingImage] = useState<BreedImage | null>(null);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchBreedImages();
  }, []);

  const fetchBreedImages = async () => {
    try {
      const { data, error } = await supabase
        .from('breed_images')
        .select('*')
        .order('breed_name');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedBreed || !selectedAge || !imageUrl) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
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
        // Insert new image
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

      fetchBreedImages();
      resetForm();
      setShowDialog(false);
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

      fetchBreedImages();
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
  };

  const openEditDialog = (image: BreedImage) => {
    setEditingImage(image);
    setSelectedBreed(image.breed_name);
    setSelectedAge(image.age_category);
    setImageUrl(image.image_url);
    setShowDialog(true);
  };

  const openAddDialog = () => {
    resetForm();
    setShowDialog(true);
  };

  const filteredImages = breedImages.filter(image =>
    image.breed_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.age_category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-lg">Loading breed images...</div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl text-primary">Breed Image Management</CardTitle>
            <CardDescription>Manage images for different breeds and age categories</CardDescription>
          </div>
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              <Button onClick={openAddDialog} className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Add Breed Image
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingImage ? 'Edit Breed Image' : 'Add New Breed Image'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="breed">Breed</Label>
                    <Select value={selectedBreed} onValueChange={setSelectedBreed}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select breed" />
                      </SelectTrigger>
                      <SelectContent>
                        {BREEDS.map(breed => (
                          <SelectItem key={breed} value={breed}>
                            {breed}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="age">Age Category</Label>
                    <Select value={selectedAge} onValueChange={setSelectedAge}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select age" />
                      </SelectTrigger>
                      <SelectContent>
                        {AGE_CATEGORIES.map(age => (
                          <SelectItem key={age} value={age}>
                            {age}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Upload Image</Label>
                  <ProductImageUpload
                    onImageChange={(url) => setImageUrl(url || "")}
                    currentImageUrl={imageUrl}
                  />
                </div>

                {imageUrl && (
                  <div className="space-y-2">
                    <Label>Current Image URL</Label>
                    <Input 
                      value={imageUrl} 
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="Image URL"
                    />
                  </div>
                )}

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingImage ? 'Update' : 'Save'} Image
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Search by breed or age..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredImages.map((image) => (
            <Card key={image.id} className="overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src={image.image_url}
                  alt={`${image.breed_name} - ${image.age_category}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
              </div>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">{image.breed_name}</h3>
                  <Badge variant="secondary">{image.age_category}</Badge>
                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEditDialog(image)}
                      className="flex-1"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteBreedImage(image.id)}
                      className="flex-1"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No breed images found. Click "Add Breed Image" to get started.
          </div>
        )}
      </CardContent>
    </Card>
  );
};