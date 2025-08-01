import { useState, useEffect, useMemo } from "react";
import api from "@/instance/api";
import { Hero } from "@/components/DashboardClient/Hero";
import { SearchBar } from "@/components/DashboardClient/SearchBar";
import { CategoryTabs } from "@/components/CategoryTabs";
import { ProviderCard, Provider } from "@/components/ProviderCard";

export default function CustomerDashboard() {
  const [allProviders, setAllProviders] = useState<Provider[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const userName = "Davi Monteiro";
  const firstLetter = userName.charAt(0).toUpperCase();

  useEffect(() => {
    async function fetchProviders() {
      try {
        const response = await api.get("/users", { params: { role: "provider" } });
        setAllProviders(response.data);
      } catch (error) {
        console.error("Erro ao buscar provedores:", error);
      }
    }
    fetchProviders();
  }, []);

  const filteredProviders = useMemo(() => {
    return allProviders.filter((provider) => {
      const matchesSearch =
        searchQuery === "" ||
        provider.name.toLowerCase().includes(searchQuery.toLowerCase());

      // Aqui você pode adaptar a filtragem por categoria conforme seu backend

      const matchesCategory = activeCategory === "all" || true; // ajustar lógica real

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, allProviders]);

  const handleSearch = (query: string, category: string) => {
    setSearchQuery(query);
    setActiveCategory(category);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // redirecionar, ex: router.push("/login")
    console.log("Usuário deslogado");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gray-400 text-white flex items-center justify-center font-bold">
            {firstLetter}
          </div>
          <span className="font-medium text-foreground">{userName}</span>
        </div>

        <button
          onClick={handleLogout}
          className="text-red-500 border border-red-500 px-4 py-1 rounded hover:bg-red-500 hover:text-white transition"
        >
          Sair
        </button>
      </div>

      <Hero />
      <div className="container mx-auto px-6 -mt-16 relative z-20">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="container mx-auto px-6 py-16">
        <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {filteredProviders.length} Profissionais Encontrados
            </h2>
            <p className="text-muted-foreground">
              {activeCategory === "all"
                ? "Todos os profissionais"
                : `Categoria: ${activeCategory}`}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider, index) => (
            <div key={provider.id} style={{ animationDelay: `${index * 0.1}s` }}>
              <ProviderCard provider={provider} />
            </div>
          ))}
        </div>

        {filteredProviders.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Nenhum profissional encontrado
            </h3>
            <p className="text-muted-foreground">
              Tente ajustar seus filtros ou buscar por outros termos
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
