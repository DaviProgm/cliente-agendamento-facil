import RegisterForm from "@/components/RegisterForm";

const Register = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center bg-gradient-to-br from-white via-[#8B5CF6] to-[#A3FF12] p-8 sm:p-12 text-white">
        <div className="flex flex-col items-center text-center">
          <img src="/logo.png" alt="Logo Cloktrix" className="h-32 sm:h-48 object-contain mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight drop-shadow-md">
            CLOKTRIX
          </h1>
          <p className="text-lg sm:text-xl mt-4 max-w-md text-white/90">
            Organize seus agendamentos e clientes com facilidade e eficiência.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-white p-8 sm:p-12">
        <div className="w-full max-w-md">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 text-center">
            Crie sua conta
          </h2>
          <p className="text-gray-600 mb-8 text-center">
            Comece a organizar sua vida profissional hoje mesmo.
          </p>
          <RegisterForm />
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">Já tem uma conta?</span>
            <a
              href="/login"
              className="ml-1 text-sm font-medium text-indigo-700 hover:underline"
            >
              Faça o login!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;