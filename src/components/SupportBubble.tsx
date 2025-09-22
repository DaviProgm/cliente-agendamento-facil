import { useState } from "react";
import { LifeBuoy, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import api from "@/instance/api";

const SupportBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSupportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) {
      toast.warn("Assunto e mensagem são obrigatórios.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/support-tickets", { subject, message });
      if (response.data.whatsappUrl) {
        window.open(response.data.whatsappUrl, '_blank');
        toast.success("Você será redirecionado para o WhatsApp para continuar seu suporte.");
      } else {
        toast.success(response.data.message || "Chamado enviado com sucesso!");
      }
      setSubject("");
      setMessage("");
      setIsOpen(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Ocorreu um erro ao enviar o chamado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg z-[999]"
        >
          <LifeBuoy className="h-8 w-8" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 mr-4 mb-2">
        <form onSubmit={handleSupportSubmit} className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Suporte</h4>
            <p className="text-sm text-muted-foreground">
              Envie sua dúvida ou problema para nossa equipe.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="subject">Assunto</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="col-span-2 h-8"
                placeholder="Ex: Problema com agendamento"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="message">Mensagem</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="col-span-2"
                placeholder="Descreva seu problema em detalhes..."
              />
            </div>
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Enviando..." : <><Send className="w-4 h-4 mr-2" /> Enviar</>}
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default SupportBubble;
