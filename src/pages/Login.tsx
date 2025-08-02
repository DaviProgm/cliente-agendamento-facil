import LoginForm from "@/components/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-white via-[#8B5CF6] to-[#A3FF12] p-12 text-white">
        <div className="flex flex-col items-center text-center">
          <img src="/logo.png" alt="Logo Cloktrix" className="h-48 object-contain mb-4" />
          <h1 className="text-5xl font-extrabold tracking-tight drop-shadow-md">
            CLOKTRIX
          </h1>
          <p className="text-xl mt-4 max-w-md text-white/90">
            Organize seus agendamentos e clientes com facilidade e eficiência.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-white p-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">
            Entrar na sua conta
          </h2>
          <p className="text-gray-600 mb-8 text-center">
            Acesse sua agenda personalizada gratuitamente
          </p>
          <LoginForm />
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">Não tem uma conta?</span>
            <a
              href="/register"
              className="ml-1 text-sm font-medium text-indigo-700 hover:underline"
            >
              Cadastre-se!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;