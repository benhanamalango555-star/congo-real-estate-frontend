import { Home, Search, PlusCircle } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface HeaderProps {
  onAdminClick?: () => void;
}

export default function Header({ onAdminClick }: HeaderProps) {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-2 cursor-pointer hover-elevate active-elevate-2 rounded-md px-3 py-2 -ml-3">
              <Home className="h-6 w-6 text-primary" />
              <div>
                <h1 className="text-xl font-bold font-heading text-foreground">RDC Maison</h1>
                <p className="text-xs text-muted-foreground">Rapide Rapide</p>
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            <Link href="/" data-testid="link-nav-home">
              <Button 
                variant={location === "/" ? "secondary" : "ghost"}
                className="gap-2"
              >
                <Home className="h-4 w-4" />
                Accueil
              </Button>
            </Link>
            <Link href="/parcourir" data-testid="link-nav-browse">
              <Button 
                variant={location === "/parcourir" ? "secondary" : "ghost"}
                className="gap-2"
              >
                <Search className="h-4 w-4" />
                Parcourir
              </Button>
            </Link>
            <Link href="/publier" data-testid="link-nav-publish">
              <Button 
                variant="default"
                className="gap-2"
                data-testid="button-publish-nav"
              >
                <PlusCircle className="h-4 w-4" />
                Publier une Annonce
              </Button>
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onAdminClick}
              className="text-xs text-muted-foreground"
              data-testid="button-admin-access"
            >
              Admin
            </Button>
          </div>

          <nav className="flex md:hidden items-center gap-2">
            <Link href="/parcourir" data-testid="link-mobile-browse">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/publier" data-testid="link-mobile-publish">
              <Button variant="default" size="icon">
                <PlusCircle className="h-5 w-5" />
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
