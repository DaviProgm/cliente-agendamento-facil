import api from "@/instance/api";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanRole = role.trim().toLowerCase();

    try {
      const response = await api.post("/users/register", {
        name,
        email,
        password,
        role: cleanRole,
      });

      if (role === "cliente") {
        toast.error("O Dashboard para clientes ainda está em desenvolvimento.", {
          onClose: () => window.location.reload(),
          autoClose: 3000,
        });
      } else {
        toast.success("Cadastro realizado com sucesso!");
      }
    } catch (error: any) {
      toast.error(`Erro ao cadastrar: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-[#8B5CF6] to-[#A3FF12] px-4 py-10">
      <div className="w-[280px] h-48 flex justify-center items-center">
        <img src="/logo.png" alt="Cloktrix Logo" className="h-full object-contain" />
      </div>
      <h1 className="text-4xl font-extrabold text-white drop-shadow mt-[-4rem] mb-10 tracking-tight ">CLOKTRIX</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-5 text-white border border-white/20"
      >
        <div className="space-y-1">
          <label htmlFor="name" className="text-sm font-medium text-white">Nome</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-lg px-4 py-2 bg-white/80 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-all"
            placeholder="Seu nome completo"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-white">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg px-4 py-2 bg-white/80 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-all"
            placeholder="voce@email.com"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="text-sm font-medium text-white">Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg px-4 py-2 bg-white/80 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-all"
            placeholder="••••••••"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="role" className="text-sm font-medium text-white">Cargo</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="w-full rounded-lg px-4 py-2 bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-all"
          >
            <option value="">Selecione...</option>
            <option value="customer">Cliente</option>
            <option value="creditor">Prestador</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-xl bg-gradient-to-r from-white via-white to-white text-indigo-700 font-semibold shadow-md hover:brightness-95 transition-all"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
