import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import api from "@/instance/api";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await api.post("/auth/forgot-password", { email });
      setMessage(response.data.message || "Se este e-mail estiver cadastrado, você receberá um link para redefinir sua senha.");
      toast.success("Link de redefinição enviado! Verifique seu e-mail.");
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Ocorreu um erro. Tente novamente mais tarde.");
      toast.error("Erro ao enviar link de redefinição.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-galactic-dark via-galactic-indigo to-galactic-dark text-foreground flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center text-center">
        <div className="max-w-md mx-auto bg-card p-8 sm:p-12 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-extrabold text-primary mb-4">Esqueci Minha Senha</h1>
          <p className="text-muted-foreground mb-8">
            Digite seu e-mail para receber um link de redefinição de senha.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Enviando..." : "Enviar Link de Redefinição"}
            </Button>
          </form>
          {message && (
            <p className="mt-4 text-sm text-muted-foreground">
              {message}
            </p>
          )}
          <p className="mt-6 text-sm text-muted-foreground">
            Lembrou da senha?{" "}
            <a href="/login" className="font-medium text-primary hover:underline">
              Faça o login!
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
