import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Erro no login",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("https://schedule-control-api.onrender.com/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userRole", user.role);

      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo, ${user.email}!`,
      });

      setTimeout(() => {
        if (user.role === "customer") {
          navigate("/dashboard-cliente");
        } else {
          navigate("/dashboard");
        }
      }, 100);
    } catch (error) {
      toast({
        title: "Falha na autenticação",
        description:
          error.response?.data?.message ||
          "Email ou senha inválidos. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-[#8B5CF6] to-[#A3FF12] px-4 py-12">
      {/* Logo + Nome */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-[260px] h-48 flex items-center justify-center mb-[-1.5rem]">
          <img src="/logo.png" alt="Logo Cloktrix" className="h-full object-contain" />
        </div>
        <h1 className="text-5xl font-extrabold text-white tracking-tight drop-shadow-md mt-[-2rem]">
          CLOKTRIX
        </h1>
      </div>

      {/* Card de Login */}
<Card className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20">
  <CardHeader className="text-center">
    <CardTitle className="text-3xl font-extrabold text-white drop-shadow">
      Entrar na sua conta
    </CardTitle>
    <CardDescription className="text-white/80 text-sm mt-1">
      Acesse sua agenda personalizada gratuitamente
    </CardDescription>
  </CardHeader>

  <CardContent>
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-white">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white text-black rounded-md"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-white">Senha</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-white text-black rounded-md"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-white text-indigo-700 hover:bg-indigo-100 font-semibold shadow-md mt-2"
        disabled={loading}
      >
        {loading ? "Entrando..." : "Entrar"}
      </Button>
    </form>

    <div className="mt-6 text-center">
      <span className="text-sm text-white/80">Não tem uma conta?</span>
      <a
        href="/register"
        className="ml-1 text-sm font-medium text-white underline hover:text-indigo-200"
      >
        Cadastre-se!
      </a>
    </div>
  </CardContent>
</Card>
    </div>
  );
};

export default Login;
