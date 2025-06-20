#  AgendaPro — Sistema de Agendamento e Controle de Clientes

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18-green?logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?logo=postgresql)
![License](https://img.shields.io/badge/license-MIT-lightgrey)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

**Agenda Pro** é uma aplicação completa de gerenciamento de agendamentos com controle de clientes, horários e serviços. Conta com painel de controle moderno, login seguro via JWT, e integração full stack com API REST. Ideal para clínicas, salões, estúdios ou qualquer serviço que utilize agendamento com clientes.

---

## ⚙️ Tecnologias Utilizadas

### 🔹 Frontend
- React 18 + Vite
- TypeScript
- Tailwind CSS
- Axios (com interceptor de JWT)
- Toast/sonner para feedbacks
- Deploy: [Vercel](https://cliente-agendamento-facil.vercel.app)

### 🔸 Backend
- Node.js + Express
- Sequelize ORM + PostgreSQL
- JWT para autenticação
- Dotenv
- Deploy: [Render]

---

## 💻 Funcionalidades

- 🔐 Login com JWT
- 👥 CRUD de Clientes
- 📅 CRUD de Agendamentos
- ✅ Marcar agendamento como "concluído"
- ❌ Cancelar agendamento
- 🔍 Busca por nome ou serviço
- 🔒 Rotas protegidas por token
- 📊 Painel moderno e responsivo

---

## 🗂️ Estrutura de Pastas
📁 frontend/
├──src/
├── components/
│ ├── AppointmentList.tsx
│ ├── EditAppointmentModal.jsx
│ └── AddClientModal.tsx
├── instance/
│ └── api.js
├── hooks/
│ └── use-toast.ts
├── pages/
│ └── Dashboard.tsx



📁 backend/
├── src/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ └── middleware/authMiddleware.js
├── .env
└── server.js

yaml
Copiar
Editar

---

## 🧪 Como Rodar Localmente

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/agenda-facil.git
cd agenda-facil
2. Configure o Backend
bash

cd backend
cp .env.example .env # configure banco, JWT_SECRET, etc.
npm install
npx sequelize db:migrate
npm run dev
3. Configure o Frontend
bash
Copiar
Editar
cd frontend
npm install
npm run dev
🔐 Autenticação JWT
Após login, o token JWT é salvo no localStorage e usado automaticamente via interceptor do Axios:


// api.js
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
🤝 Contribuições
Sinta-se à vontade para abrir issues, enviar pull requests, ou sugerir melhorias.

📄 Licença
Este projeto está sob a MIT License.


## Desenvolvido por Davi Monteiro
