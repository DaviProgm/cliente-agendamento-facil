import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";

const Pricing = () => {
  const navigate = useNavigate();

  const handleSubscribe = (plan: 'basic' | 'pro') => {
    navigate(`/register?plan=${plan}`);
  };

  return (
    <section id="pricing" className="w-full max-w-5xl mx-auto mt-24">
      <h2 className="text-4xl font-bold text-center mb-12">Escolha o plano ideal para você</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Plano Básico */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl">Plano Básico</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-3xl font-bold">R$ 29,99<span className="text-lg font-normal text-muted-foreground">/mês</span></p>
            <ul className="list-disc list-inside mt-6 space-y-2">
              <li>Agendamentos ilimitados</li>
              <li>Cadastro de clientes</li>
              <li>Suporte por e-mail</li>
            </ul>
          </CardContent>
          <CardFooter className="p-4">
            <Button onClick={() => handleSubscribe('basic')} className="w-full" variant="secondary">Assinar Básico</Button>
          </CardFooter>
        </Card>
        {/* Plano Pro */}
        <Card className="border-primary border-2 relative flex flex-col">
          <Badge className="absolute -top-3 left-1/2 -translate-x-1/2" variant="default">Mais Popular</Badge>
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Plano Pro</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-3xl font-bold">R$ 49,99<span className="text-lg font-normal text-muted-foreground">/mês</span></p>
            <ul className="list-disc list-inside mt-6 space-y-2">
              <li>Todos os benefícios do Plano Básico</li>
              <li>Relatórios avançados</li>
              <li>Suporte prioritário</li>
            </ul>
          </CardContent>
          <CardFooter className="p-4">
            <Button onClick={() => handleSubscribe('pro')} className="w-full" variant="default">Assinar Pro</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default Pricing;
