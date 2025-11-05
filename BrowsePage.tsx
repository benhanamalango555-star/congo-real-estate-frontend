import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation } from "wouter";
import { getListings } from "@/lib/api";

export default function BrowsePage() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  const { data: allProperties = [], isLoading } = useQuery({
    queryKey: ['/api/listings'],
    queryFn: getListings,
  });

  const filteredProperties = searchQuery
    ? allProperties.filter(p =>
        p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.commune.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.neighborhood.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allProperties;

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return 0;
  });

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4" data-testid="text-browse-title">
          Parcourir les Annonces
        </h1>
        <SearchBar onSearch={setSearchQuery} />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <p className="text-muted-foreground" data-testid="text-results-count">
          {sortedProperties.length} {sortedProperties.length > 1 ? 'propriétés trouvées' : 'propriété trouvée'}
        </p>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Trier par:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[200px]" data-testid="select-sort">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Plus Récent</SelectItem>
              <SelectItem value="price-asc">Prix Croissant</SelectItem>
              <SelectItem value="price-desc">Prix Décroissant</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-96 bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
      ) : sortedProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProperties.map((property) => (
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
          <p className="text-muted-foreground text-lg">Aucune propriété trouvée</p>
          <p className="text-sm text-muted-foreground mt-2">
            Essayez de modifier votre recherche
          </p>
        </div>
      )}
    </div>
  );
}
