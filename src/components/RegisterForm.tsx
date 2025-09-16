import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/instance/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState(""); // 1. Adicionado estado para CPF/CNPJ
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 3. Adicionado cpfCnpj no envio para a API
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
      const errorMessage = error.response?.data?.errors?.[0]?.description ||
                           error.response?.data?.message ||
                           error.message;
      toast.error(`Erro ao cadastrar: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 sm:p-6">
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

      {/* 2. Adicionado campo do formulário para CPF/CNPJ */}
      <div className="space-y-2">
        <Label htmlFor="cpfCnpj">CPF ou CNPJ</Label>
        <Input
          id="cpfCnpj"
          type="text"
          placeholder="Seu CPF ou CNPJ"
          value={cpfCnpj}
          onChange={(e) => setCpfCnpj(e.target.value)}
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
          className="bg-ray-100 text-black rounded-md"
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

      <Button
        type="submit"
        className="w-full bg-indigo-700 text-white hover:bg-indigo-800 font-semibold shadow-md mt-2"
        disabled={loading}
      >
        {loading ? "Criando conta..." : "Criar Conta"}
      </Button>
    </form>
  </Card>
  );
};

export default RegisterForm;