import { Home, Search, PlusCircle, Phone, Mail } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Home className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold font-heading">RDC Maison Appart</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              La plateforme immobilière la plus rapide au Congo. Trouvez votre maison ou appartement facilement.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" data-testid="link-footer-home">
                  <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                    Accueil
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/parcourir" data-testid="link-footer-browse">
                  <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                    Parcourir les Annonces
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/publier" data-testid="link-footer-publish">
                  <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                    Publier une Annonce
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+243 831 140 205</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>contact@rdcmaison.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 RDC Maison Appart Rapide Rapide. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
