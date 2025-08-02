import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/instance/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/users/register", {
        name,
        email,
        password,
        role,
      });

      toast.success("Cadastro realizado com sucesso! Faça o login para continuar.");
      navigate("/login");
    } catch (error: any) {
      toast.error(`Erro ao cadastrar: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          type="text"
          placeholder="Seu nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-gray-100 text-black rounded-md"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-gray-100 text-black rounded-md"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-gray-100 text-black rounded-md"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="role">Tipo de Conta</Label>
        <Select onValueChange={setRole} value={role}>
          <SelectTrigger className="bg-gray-100 text-black rounded-md">
            <SelectValue placeholder="Selecione o tipo de conta" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="customer">Cliente</SelectItem>
            <SelectItem value="creditor">Prestador de Serviço</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        className="w-full bg-indigo-700 text-white hover:bg-indigo-800 font-semibold shadow-md mt-2"
        disabled={loading}
      >
        {loading ? "Criando conta..." : "Criar Conta"}
      </Button>
    </form>
  );
};

export default RegisterForm;