import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/instance/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
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
        cpfCnpj,
        role: "customer",
      });

      toast.success("Cadastro realizado com sucesso! Faça o login para continuar.");
      navigate("/login");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.errors?.[0]?.description ||
        error.response?.data?.message ||
        error.message;
      toast.error(`Erro ao cadastrar: ${errorMessage}`);
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
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cpfCnpj">CPF ou CNPJ</Label>
        <Input
          id="cpfCnpj"
          type="text"
          placeholder="Seu CPF ou CNPJ"
          value={cpfCnpj}
          onChange={(e) => setCpfCnpj(e.target.value)}
          required
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
        />
      </div>

      <Button
        type="submit"
        className="w-full font-semibold shadow-md mt-2"
        disabled={loading}
      >
        {loading ? "Criando conta..." : "Criar Conta"}
      </Button>
    </form>
  );
};

export default RegisterForm;