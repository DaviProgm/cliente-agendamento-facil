import { useState } from "react";
import { Search, Filter, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchBarProps {
  onSearch: (query: string, category: string, location: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    onSearch(query, category, location);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-black/40 backdrop-blur-md rounded-2xl p-6 shadow-card border border-white/10">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder="Que serviço você precisa?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary focus:ring-primary"
          />
        </div>

        {/* Category Filter */}
        <div className="flex-none w-full md:w-48">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="h-12 bg-background/50 border-border/50">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="design">Design & Arte</SelectItem>
              <SelectItem value="tech">Tecnologia</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="education">Educação</SelectItem>
              <SelectItem value="health">Saúde & Bem-estar</SelectItem>
              <SelectItem value="business">Negócios</SelectItem>
              <SelectItem value="photography">Fotografia</SelectItem>
              <SelectItem value="writing">Redação</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Location Filter */}
        <div className="flex-none w-full md:w-48">
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="h-12 bg-background/50 border-border/50">
              <MapPin className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Localização" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sp">São Paulo</SelectItem>
              <SelectItem value="rj">Rio de Janeiro</SelectItem>
              <SelectItem value="mg">Minas Gerais</SelectItem>
              <SelectItem value="rs">Rio Grande do Sul</SelectItem>
              <SelectItem value="pr">Paraná</SelectItem>
              <SelectItem value="sc">Santa Catarina</SelectItem>
              <SelectItem value="remote">Remoto</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <Button 
          onClick={handleSearch}
          className="h-12 px-8 bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold shadow-glow hover:shadow-elevation transition-all duration-300"
        >
          Buscar
        </Button>
      </div>
    </div>
  );
};