import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import api from "@/instance/api";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { token } = useParams(); // Get token from URL

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    if (!token) {
      setMessage("Token de redefinição inválido ou ausente.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post(`/auth/reset-password/${token}`, { password });
      setMessage(response.data.message || "Senha redefinida com sucesso!");
      toast.success("Senha alterada com sucesso! Redirecionando para o login.");
      setTimeout(() => navigate("/login"), 3000);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Ocorreu um erro ao redefinir a senha. Verifique o token ou tente novamente.");
      toast.error("Erro ao redefinir senha.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen galactic-background text-foreground flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center text-center">
        <div className="max-w-md mx-auto bg-card p-8 sm:p-12 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-extrabold text-primary mb-4">Redefinir Senha</h1>
          <p className="text-muted-foreground mb-8">
            Digite sua nova senha.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Nova Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Redefinindo..." : "Redefinir Senha"}
            </Button>
          </form>
          {message && (
            <p className="mt-4 text-sm text-muted-foreground">
              {message}
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResetPassword;
