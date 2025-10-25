
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Plus, Trash, Edit } from "lucide-react";
import { getUnits, deleteUnit } from "@/services/unitService";
import { toast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import AddUnitModal from "./AddUnitModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Unit {
  id: string;
  name: string;
  address?: string;
}

const UnitsPage = () => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  const fetchUnits = async () => {
    try {
      const data = await getUnits();
      setUnits(data);
    } catch (error) {
      toast({
        title: "Erro ao carregar unidades",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  const handleSave = (savedUnit: Unit) => {
    const exists = units.some(u => u.id === savedUnit.id);
    if (exists) {
      setUnits(units.map(u => u.id === savedUnit.id ? savedUnit : u));
    } else {
      setUnits([...units, savedUnit]);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUnit(id);
      setUnits(units.filter(u => u.id !== id));
      toast({
        title: "Unidade excluída com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro ao excluir unidade",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Unidades</h1>
        <Button onClick={() => { setSelectedUnit(null); setIsModalOpen(true); }}>
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Unidade
        </Button>
      </div>

      <div className="grid gap-4">
        <AnimatePresence>
          {units.map((unit) => (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center">
                        <Building className="w-5 h-5 mr-3" />
                        {unit.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{unit.address}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => { setSelectedUnit(unit); setIsModalOpen(true); }}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash className="w-4 h-4 text-red-500" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Essa ação não pode ser desfeita. Isso excluirá permanentemente a unidade.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(unit.id)}>
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AddUnitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        unit={selectedUnit}
      />
    </div>
  );
};

export default UnitsPage;
