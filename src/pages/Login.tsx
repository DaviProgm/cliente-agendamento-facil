import LoginForm from "@/components/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center galactic-background p-8 sm:p-12 text-foreground">
        <div className="flex flex-col items-center text-center">
          <img src="/logo.png" alt="Logo Workgate" className="h-32 sm:h-48 object-contain mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight drop-shadow-md">
            WORKGATE
          </h1>
          <p className="text-lg sm:text-xl mt-4 max-w-md text-foreground/90">
            Organize seus agendamentos e clientes com facilidade e eficiência.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-background p-8 sm:p-12">
        <div className="w-full max-w-md">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-2 text-center">
            Entrar na sua conta
          </h2>
          <p className="text-muted-foreground mb-8 text-center">
            Acesse sua agenda personalizada
          </p>
          <LoginForm />
          <div className="text-right mt-2">
            <a
              href="/forgot-password"
              className="text-sm font-medium text-primary hover:underline"
            >
              Esqueci minha senha?
            </a>
          </div>
          <div className="mt-6 text-center">
            <span className="text-sm text-muted-foreground">Não tem uma conta?</span>
            <a
              href="/register"
              className="ml-1 text-sm font-medium text-primary hover:underline"
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
