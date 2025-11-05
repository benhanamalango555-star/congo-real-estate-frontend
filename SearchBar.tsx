import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log('Searching for:', query);
    onSearch?.(query);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher par ville, commune ou quartier..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-10 h-12 text-base"
            data-testid="input-search"
          />
        </div>
        <Button 
          onClick={handleSearch}
          size="lg"
          className="h-12 px-6"
          data-testid="button-search"
        >
          <Search className="h-5 w-5 mr-2" />
          Rechercher
        </Button>
      </div>
    </div>
  );
}
