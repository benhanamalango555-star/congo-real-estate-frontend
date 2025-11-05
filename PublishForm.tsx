import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X, DollarSign } from "lucide-react";

interface PublishFormProps {
  onSubmit?: (data: any) => void;
}

export default function PublishForm({ onSubmit }: PublishFormProps) {
  const [formData, setFormData] = useState({
    city: "",
    commune: "",
    neighborhood: "",
    rooms: "",
    propertyType: "",
    transactionType: "",
    price: "",
    deposit: "",
    description: "",
    phone: "",
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      
      setImageFiles([...imageFiles, ...newFiles]);
      setImagePreviews([...imagePreviews, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    const newFiles = imageFiles.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    
    URL.revokeObjectURL(imagePreviews[index]);
    
    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = {
      ...formData,
      images: imageFiles,
    };
    
    onSubmit?.(submitData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-heading">Publier une Annonce</CardTitle>
          <CardDescription>
            Remplissez tous les champs pour publier votre propriété. Frais de publication: 1500 CFA
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="city">Ville *</Label>
              <Input
                id="city"
                placeholder="Ex: Kinshasa"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
                data-testid="input-city"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="commune">Commune *</Label>
              <Input
                id="commune"
                placeholder="Ex: Gombe"
                value={formData.commune}
                onChange={(e) => setFormData({ ...formData, commune: e.target.value })}
                required
                data-testid="input-commune"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="neighborhood">Quartier *</Label>
              <Input
                id="neighborhood"
                placeholder="Ex: Quartier Résidentiel"
                value={formData.neighborhood}
                onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                required
                data-testid="input-neighborhood"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rooms">Nombre de Chambres *</Label>
              <Input
                id="rooms"
                type="number"
                placeholder="Ex: 3"
                value={formData.rooms}
                onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                required
                data-testid="input-rooms"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="propertyType">Type de Propriété *</Label>
              <Select value={formData.propertyType} onValueChange={(value) => setFormData({ ...formData, propertyType: value })}>
                <SelectTrigger data-testid="select-property-type">
                  <SelectValue placeholder="Sélectionner..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Maison">Maison</SelectItem>
                  <SelectItem value="Appartement">Appartement</SelectItem>
                  <SelectItem value="Studio">Studio</SelectItem>
                  <SelectItem value="Duplex">Duplex</SelectItem>
                  <SelectItem value="Villa">Villa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="transactionType">Type de Transaction *</Label>
              <Select value={formData.transactionType} onValueChange={(value) => setFormData({ ...formData, transactionType: value })}>
                <SelectTrigger data-testid="select-transaction-type">
                  <SelectValue placeholder="Sélectionner..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vente">Vente</SelectItem>
                  <SelectItem value="Location">Location</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Prix (CFA) *</Label>
              <Input
                id="price"
                type="number"
                placeholder="Ex: 50000000"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                data-testid="input-price"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deposit">Caution/Garantie (CFA)</Label>
              <Input
                id="deposit"
                type="number"
                placeholder="Ex: 1000000"
                value={formData.deposit}
                onChange={(e) => setFormData({ ...formData, deposit: e.target.value })}
                data-testid="input-deposit"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Décrivez votre propriété en détail..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              required
              data-testid="textarea-description"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Numéro de Téléphone *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Ex: +243 812 345 678"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              data-testid="input-phone"
            />
            <p className="text-xs text-muted-foreground">Ce numéro sera masqué. Les visiteurs paieront 2500 CFA pour le débloquer.</p>
          </div>

          <div className="space-y-2">
            <Label>Photos de la Propriété *</Label>
            <div className="border-2 border-dashed rounded-lg p-8 text-center hover-elevate">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
                data-testid="input-images"
                required={imageFiles.length === 0}
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm font-medium mb-1">Cliquez pour télécharger des photos</p>
                <p className="text-xs text-muted-foreground">PNG, JPG jusqu'à 10MB</p>
              </label>
            </div>

            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                    <img src={preview} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      data-testid={`button-remove-image-${index}`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-accent/50 rounded-lg p-4 flex items-start gap-3">
            <DollarSign className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium mb-1">Frais de Publication: 1500 CFA</p>
              <p className="text-sm text-muted-foreground">
                Après validation, vous recevrez les instructions de paiement par Mobile Money (+243 831 140 205)
              </p>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full" data-testid="button-submit-publish">
            Continuer vers le Paiement
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
