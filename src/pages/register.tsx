import api from "@/instance/api";
import { useState } from "react";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const handleSubmit = async  (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post("/users/register",{
                name,
                email,
                password,
                role,
            })
            alert("Cadastro realizado com sucesso!");
        } catch (error) {
           console.error("Erro ao cadastrar:", error);
              alert(`Erro ao cadastrar: ${error.response?.data?.message || error.message}`); 
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <h1 className="text-2xl font-bold mb-6">Cadastro</h1>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="name">Nome</label>
                    <input
                        id="name"
                        type="text"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="password">Senha</label>
                    <input
                        id="password"
                        type="password"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="role">Cargo</label>
                    <select
                        id="role"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={role}
                        onChange={e => setRole(e.target.value)}
                        required
                    >
                        <option value="" disabled>Selecione o cargo</option>
                        <option value="prestador">Prestador</option>
                        <option value="cliente">Cliente</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                >
                    Cadastrar
                </button>
            </form>
        </div>
    );
}