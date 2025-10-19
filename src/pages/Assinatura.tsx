import React, { useState, useEffect } from 'react';
import api from '@/instance/api';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'react-toastify';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Assinatura = () => {
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchSubscription = async () => {
    setLoading(true);
    try {
      const response = await api.get('/subscription');
      setSubscription(response.data);
      console.log('Dados da assinatura carregados:', response.data);
    } catch (error: any) {
      if (error.response && (error.response.status === 404 || error.response.status === 403)) {
        setSubscription(null);
      } else {
        console.error('Erro ao buscar dados da assinatura:', error);
        toast.error('Não foi possível buscar os dados da sua assinatura.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, []);

  const handleSubscribe = async (plan: 'basic' | 'pro') => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        toast.error('ID do usuário não encontrado. Por favor, faça login novamente.');
        return;
      }

      const response = await api.post('/subscriptions', { userId: Number(userId), plan });

      // Redirecionamento imediato para a URL de pagamento do Asaas
      if (response.data.paymentInfo && response.data.paymentInfo.invoiceUrl) {
        window.location.href = response.data.paymentInfo.invoiceUrl;
        return; // Para a execução aqui para garantir que o redirecionamento ocorra sem interferência
      } else {
        toast.error('Não foi possível obter a URL de pagamento. Tente novamente.');
        fetchSubscription(); // Atualiza a página para mostrar o status pendente
      }

    } catch (error: any) {
      console.error('Erro ao criar assinatura:', error);
      toast.error(error.response?.data?.message || 'Não foi possível processar sua assinatura.');
    }
  };

  const handleCancelSubscription = async () => {
    console.log('Tentando cancelar assinatura...');
    try {
      const response = await api.delete('/subscription');
      console.log('Resposta da API de cancelamento:', response.data);
      toast.success('Sua assinatura foi cancelada.');
      fetchSubscription(); // Atualiza a UI para refletir o cancelamento
    } catch (error: any) {
      console.error('Erro ao cancelar assinatura:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Não foi possível cancelar sua assinatura.');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><p>Carregando...</p></div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* O título foi movido para a função getTitle do Dashboard, então podemos remover este h1 */}
      {/* <h1 className="text-3xl sm:text-4xl font-bold mb-8">Gerenciar Assinatura</h1> */}
      
      {subscription ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Sua Assinatura</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg">Plano: <span className="font-semibold capitalize text-primary">{subscription.subscription.plan}</span></p>
            <div className="flex items-center">
              <p className="text-lg mr-3">Status:</p>
              <Badge variant={subscription.subscription.status === 'ativo' ? 'secondary' : 'default'}>
                {subscription.subscription.status}
              </Badge>
            </div>
            {subscription.subscription.status === 'pendente' && subscription.invoiceUrl && (
              <p className="text-sm text-muted-foreground pt-2">Sua assinatura está aguardando pagamento. Finalize para liberar todos os recursos.</p>
            )}
          </CardContent>
          <CardFooter className="bg-card p-4 flex justify-end gap-2">
            {subscription.subscription.status === 'pendente' && subscription.invoiceUrl && (
              <Button onClick={() => window.location.href = subscription.invoiceUrl} variant="default">
                Pagar agora
              </Button>
            )}
            {subscription.subscription.status === 'ativo' && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Cancelar Assinatura</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita. Sua assinatura será cancelada imediatamente e você perderá o acesso aos recursos do plano.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Manter plano</AlertDialogCancel>
                    <AlertDialogAction onClick={handleCancelSubscription} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Confirmar Cancelamento
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </CardFooter>
        </Card>
      ) : (
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
      )}
    </div>
  );
};

export default Assinatura;