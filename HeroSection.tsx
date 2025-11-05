import { Search, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroImage from '@assets/generated_images/Kinshasa_cityscape_hero_image_a87725a3.png';

export default function HeroSection() {
  return (
    <div className="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
      
      <div className="relative z-10 container mx-auto max-w-7xl px-4 text-center text-white">
        <h1 className="text-5xl md:text-6xl font-bold font-heading mb-4" data-testid="text-hero-title">
          Trouvez Votre Maison
          <br />
          <span className="text-primary-foreground">Rapide Rapide</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
          La plateforme immobilière la plus simple au Congo. Publiez ou trouvez des maisons et appartements en quelques clics.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/publier" data-testid="link-hero-publish">
            <Button 
              size="lg" 
              variant="default"
              className="gap-2 text-lg h-14 px-8 backdrop-blur-sm"
              data-testid="button-hero-publish"
            >
              <PlusCircle className="h-5 w-5" />
              Publier une Annonce
            </Button>
          </Link>
          
          <Link href="/parcourir" data-testid="link-hero-browse">
            <Button 
              size="lg" 
              variant="outline"
              className="gap-2 text-lg h-14 px-8 backdrop-blur-sm bg-white/10 hover:bg-white/20 text-white border-white/30"
              data-testid="button-hero-browse"
            >
              <Search className="h-5 w-5" />
              Parcourir les Annonces
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
