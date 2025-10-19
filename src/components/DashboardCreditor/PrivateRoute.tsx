import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "@/instance/api";

function isTokenValid(token: string | null) {
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const now = Date.now() / 1000;
    return payload.exp > now;
  } catch {
    return false;
  }
}

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  const localSubscriptionStatus = localStorage.getItem("subscriptionStatus");
  const [loading, setLoading] = useState(true);
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(localSubscriptionStatus);

  useEffect(() => {
    const checkSubscription = async () => {
      if (!isTokenValid(token)) {
        setLoading(false);
        return;
      }

      // Se já temos um status ativo, não precisamos verificar de novo
      if (localSubscriptionStatus === 'ativo') {
        setSubscriptionStatus('ativo');
        setLoading(false);
        return;
      }

      // Se não, buscamos na API
      try {
        const response = await api.get('/subscription');
        const apiStatus = response.data.subscription.status;
        localStorage.setItem('subscriptionStatus', apiStatus); // Atualiza o localStorage
        setSubscriptionStatus(apiStatus);
      } catch (error: any) {
        if (error.response?.status === 404 || error.response?.status === 403) {
          setSubscriptionStatus('no_subscription');
        } else {
          console.error("Erro ao buscar status da assinatura:", error);
          setSubscriptionStatus('error');
        }
      } finally {
        setLoading(false);
      }
    };

    checkSubscription();
  }, [token, localSubscriptionStatus]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col justify-center items-center bg-background/80 backdrop-blur-sm z-50">
        <div className="text-6xl font-extrabold tracking-widest workgate-fill-animation">
          WORKGATE
        </div>
      </div>
    );
  }

  if (!isTokenValid(token)) {
    localStorage.clear(); // Limpa tudo se o token for inválido
    return <Navigate to="/login" />;
  }

  // Redireciona se a assinatura não for ativa
  if (subscriptionStatus !== 'ativo') {
    return <Navigate to="/subscription-selection" />;
  }

  return children;
};

export default PrivateRoute;
