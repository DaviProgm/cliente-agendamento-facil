import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Code, Megaphone, GraduationCap, Heart, Briefcase, Camera, PenTool } from "lucide-react";

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: "all", label: "Todos", icon: Briefcase },
  { id: "design", label: "Design", icon: Palette },
  { id: "tech", label: "Tecnologia", icon: Code },
  { id: "marketing", label: "Marketing", icon: Megaphone },
  { id: "education", label: "Educação", icon: GraduationCap },
  { id: "health", label: "Saúde", icon: Heart },
  { id: "photography", label: "Fotografia", icon: Camera },
  { id: "writing", label: "Redação", icon: PenTool },
];

export const CategoryTabs = ({ activeCategory, onCategoryChange }: CategoryTabsProps) => {
  return (
    <div className="w-full max-w-6xl mx-auto mb-8">
      <Tabs value={activeCategory} onValueChange={onCategoryChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8 bg-background/50 backdrop-blur-md border border-border/50 rounded-xl p-2 h-auto gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex flex-col items-center gap-2 py-3 px-4 data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow rounded-lg transition-all duration-300 hover:scale-105"
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{category.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
    </div>
  );
};