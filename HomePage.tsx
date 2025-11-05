import { useQuery } from "@tanstack/react-query";
import HeroSection from "@/components/HeroSection";
import PropertyCard from "@/components/PropertyCard";
import { useLocation } from "wouter";
import { getListings } from "@/lib/api";

export default function HomePage() {
  const [, setLocation] = useLocation();

  const { data: listings = [], isLoading } = useQuery({
    queryKey: ['/api/listings'],
    queryFn: getListings,
  });

  const featuredProperties = listings.filter(l => l.featured).slice(0, 2);
  const latestProperties = listings.filter(l => !l.featured).slice(0, 6);

  return (
    <div>
      <HeroSection />

      <div className="container mx-auto max-w-7xl px-4 py-16">
        {featuredProperties.length > 0 && (
          <>
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-2" data-testid="text-featured-title">
                Annonces Vedettes
              </h2>
              <p className="text-muted-foreground">
                Les meilleures offres du moment
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
              {featuredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  id={property.id}
                  title={`${property.propertyType} à ${property.commune}`}
                  type={property.propertyType}
                  transactionType={property.transactionType as "Vente" | "Location"}
                  price={property.price}
                  deposit={property.deposit || undefined}
                  city={property.city}
                  commune={property.commune}
                  neighborhood={property.neighborhood}
                  rooms={property.rooms}
                  image={property.images[0]}
                  featured={property.featured}
                  onClick={() => setLocation(`/propriete/${property.id}`)}
                />
              ))}
            </div>
          </>
        )}

        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-2" data-testid="text-latest-title">
            {featuredProperties.length > 0 ? 'Dernières Annonces' : 'Annonces Disponibles'}
          </h2>
          <p className="text-muted-foreground">
            Découvrez les {featuredProperties.length > 0 ? 'nouvelles' : ''} propriétés disponibles
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-96 bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        ) : latestProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestProperties.map((property) => (
              <PropertyCard
                key={property.id}
                id={property.id}
                title={`${property.propertyType} à ${property.commune}`}
                type={property.propertyType}
                transactionType={property.transactionType as "Vente" | "Location"}
                price={property.price}
                deposit={property.deposit || undefined}
                city={property.city}
                commune={property.commune}
                neighborhood={property.neighborhood}
                rooms={property.rooms}
                image={property.images[0]}
                onClick={() => setLocation(`/propriete/${property.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">Aucune annonce disponible pour le moment</p>
            <p className="text-sm text-muted-foreground mt-2">
              Revenez bientôt pour voir les nouvelles propriétés
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
