
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Plus, Trash, Edit } from "lucide-react";
import { getProfessionals, createProfessional } from "@/services/userService";
import { toast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import AddProfessionalModal from "./AddProfessionalModal";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Professional {
  id: string;
  name: string;
  email: string;
  foto_perfil_url?: string;
}

const ProfessionalsPage = () => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProfessionals = async () => {
    try {
      const data = await getProfessionals();
      setProfessionals(data);
    } catch (error) {
      toast({ title: "Erro ao carregar profissionais", variant: "destructive" });
    }
  };

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const handleSave = (savedProfessional: Professional) => {
    setProfessionals([...professionals, savedProfessional]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Profissionais</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Profissional
        </Button>
      </div>

      <div className="grid gap-4">
        <AnimatePresence>
          {professionals.map((prof) => (
            <motion.div
              key={prof.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={prof.foto_perfil_url} />
                        <AvatarFallback>{prof.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{prof.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{prof.email}</p>
                      </div>
                    </div>
                    {/* Action buttons can be added here if needed */}
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AddProfessionalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default ProfessionalsPage;
