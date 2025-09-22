import { useQuery } from "@tanstack/react-query";
import { getServices } from "@/services/serviceService";
import { useState } from "react";
import AddServiceModal from "./AddServiceModal";
import EditServiceModal from "./EditServiceModal";
import DeleteServiceDialog from "./DeleteServiceDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CirclePlus, Pencil, Trash2 } from "lucide-react";

interface Service {
  id: number;
  name: string;
  duration: number;
  price: string;
}

const ServicesPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const { data: services, isLoading, isError } = useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: getServices,
  });

  const handleEditClick = (service: Service) => {
    setSelectedService(service);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (service: Service) => {
    setSelectedService(service);
    setIsDeleteDialogOpen(true);
  };

  if (isLoading) {
    return <div className="p-4 sm:p-6">Carregando serviços...</div>;
  }

  if (isError) {
    return <div className="p-4 sm:p-6">Ocorreu um erro ao buscar os serviços.</div>;
  }

  return (
    <>
      <AddServiceModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <EditServiceModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} service={selectedService} />
      <DeleteServiceDialog isOpen={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} service={selectedService} />

      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Meus Serviços</h1>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <CirclePlus className="mr-2 h-4 w-4" />
            Adicionar Serviço
          </Button>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden sm:table-cell">Duração (min)</TableHead>
                <TableHead className="hidden md:table-cell">Preço (R$)</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services && services.length > 0 ? (
                services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell className="hidden sm:table-cell">{service.duration}</TableCell>
                    <TableCell className="hidden md:table-cell">{service.price}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="icon" onClick={() => handleEditClick(service)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => handleDeleteClick(service)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center h-24">
                    Nenhum serviço cadastrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
