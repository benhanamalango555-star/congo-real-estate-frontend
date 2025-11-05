import { useState } from "react";
import { useRoute } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PaymentModal from "@/components/PaymentModal";
import { MapPin, Home, Bed, Phone, Lock } from "lucide-react";
import { getListing, createPhoneUnlock, confirmPayment } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function PropertyDetailPage() {
  const [, params] = useRoute("/propriete/:id");
  const [unlockModalOpen, setUnlockModalOpen] = useState(false);
  const [phoneUnlocked, setPhoneUnlocked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: property, isLoading } = useQuery({
    queryKey: ['/api/listings', params?.id],
    queryFn: () => getListing(params?.id!),
    enabled: !!params?.id,
  });

  const unlockPhoneMutation = useMutation({
    mutationFn: () => createPhoneUnlock(params?.id!),
    onSuccess: (data) => {
      setPaymentId(data.payment.id);
      setUnlockModalOpen(true);
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const confirmPaymentMutation = useMutation({
    mutationFn: confirmPayment,
    onSuccess: () => {
      setUnlockModalOpen(false);
      setPhoneUnlocked(true);
      toast({
        title: "Numéro débloqué",
        description: "Vous pouvez maintenant voir le numéro de téléphone",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleUnlockPhone = () => {
    unlockPhoneMutation.mutate();
  };

  const handlePaymentConfirm = () => {
    if (paymentId) {
      confirmPaymentMutation.mutate(paymentId);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-96 bg-muted rounded-xl" />
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-muted rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">Annonce non trouvée</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <img
              src={property.images[currentImageIndex]}
              alt={property.propertyType}
              className="w-full h-full object-cover"
              data-testid="img-property-main"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge variant={property.transactionType === "Vente" ? "default" : "secondary"}>
                {property.transactionType}
              </Badge>
            </div>
          </div>

          {property.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                    currentImageIndex === index ? 'border-primary' : 'border-transparent'
                  }`}
                  data-testid={`button-image-${index}`}
                >
                  <img
                    src={image}
                    alt={`Vue ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold font-heading mb-4">Description</h2>
              <p className="text-foreground leading-relaxed" data-testid="text-description">
                {property.description}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold font-heading mb-4">Caractéristiques</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <Home className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="font-semibold">{property.propertyType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <Bed className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Chambres</p>
                    <p className="font-semibold">{property.rooms}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Commune</p>
                    <p className="font-semibold">{property.commune}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6 space-y-6">
              <div>
                <h1 className="text-2xl font-bold font-heading mb-2" data-testid="text-property-title">
                  {property.propertyType} à {property.commune}
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">{property.city}, {property.commune}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-sm">{property.neighborhood}</span>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-1">Prix</p>
                  <p className="text-3xl font-bold text-primary" data-testid="text-property-price">
                    {property.price.toLocaleString()} CFA
                  </p>
                  {property.transactionType === "Location" && (
                    <p className="text-sm text-muted-foreground">par mois</p>
                  )}
                </div>

                {property.deposit && (
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-1">Caution</p>
                    <p className="text-lg font-semibold">
                      {property.deposit.toLocaleString()} CFA
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-3">Contact Propriétaire</h3>
                {!phoneUnlocked ? (
                  <div className="space-y-3">
                    <div className="bg-muted/50 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Lock className="h-5 w-5 text-muted-foreground" />
                        <span className="text-muted-foreground">••• ••• •••</span>
                      </div>
                    </div>
                    <Button
                      onClick={handleUnlockPhone}
                      className="w-full gap-2"
                      data-testid="button-unlock-phone"
                      disabled={unlockPhoneMutation.isPending}
                    >
                      <Phone className="h-4 w-4" />
                      {unlockPhoneMutation.isPending ? 'Traitement...' : 'Débloquer le Numéro (2500 CFA)'}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-primary/10 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Phone className="h-5 w-5 text-primary" />
                        <p className="font-semibold text-lg" data-testid="text-phone-number">
                          {property.phone}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => window.location.href = `tel:${property.phone}`}
                      className="w-full"
                      data-testid="button-call"
                    >
                      Appeler Maintenant
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <PaymentModal
        open={unlockModalOpen}
        onClose={() => setUnlockModalOpen(false)}
        amount={2500}
        type="unlock"
        onConfirm={handlePaymentConfirm}
      />
    </div>
  );
}
