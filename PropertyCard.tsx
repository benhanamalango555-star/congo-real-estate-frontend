import { MapPin, Home, Bed, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface PropertyCardProps {
  id: string;
  title: string;
  type: string;
  transactionType: "Vente" | "Location";
  price: number;
  deposit?: number;
  city: string;
  commune: string;
  neighborhood: string;
  rooms: number;
  image: string;
  featured?: boolean;
  onClick?: () => void;
}

export default function PropertyCard({
  title,
  type,
  transactionType,
  price,
  city,
  commune,
  neighborhood,
  rooms,
  image,
  featured,
  onClick,
}: PropertyCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate transition-all duration-200 cursor-pointer" onClick={onClick} data-testid="card-property">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          data-testid="img-property"
        />
        <div className="absolute top-2 left-2 flex gap-2">
          <Badge variant={transactionType === "Vente" ? "default" : "secondary"} data-testid="badge-transaction-type">
            {transactionType}
          </Badge>
          {featured && (
            <Badge variant="destructive" data-testid="badge-featured">
              Vedette
            </Badge>
          )}
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start gap-2 mb-2">
          <Home className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
          <span className="text-sm text-muted-foreground">{type}</span>
        </div>

        <div className="mb-3">
          <p className="text-2xl font-bold text-foreground" data-testid="text-price">
            {price.toLocaleString()} CFA
          </p>
          {transactionType === "Location" && (
            <p className="text-xs text-muted-foreground">par mois</p>
          )}
        </div>

        <div className="space-y-1 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-foreground truncate" data-testid="text-location">
              {commune}, {neighborhood}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Bed className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground" data-testid="text-rooms">
              {rooms} {rooms > 1 ? 'Chambres' : 'Chambre'}
            </span>
          </div>
        </div>

        <Button className="w-full" variant="outline" data-testid="button-view-details">
          Voir Détails
        </Button>
      </CardContent>
    </Card>
  );
}
