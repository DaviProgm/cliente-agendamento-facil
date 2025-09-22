import { Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "@/instance/api";

function isTokenValid(token: string | null) {
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const now = Date.now() / 1000; // tempo atual em segundos
    return payload.exp > now;
  } catch {
    return false;
  }
}

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkSubscription = async () => {
      if (!isTokenValid(token)) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/subscription');
        console.log("PrivateRoute - Subscription Status from API:", response.data.subscription.status);
        setSubscriptionStatus(response.data.subscription.status);
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
  }, [token]);

  console.log("PrivateRoute - Final Subscription Status:", subscriptionStatus);

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
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }

  if (subscriptionStatus === 'pendente' || subscriptionStatus === 'no_subscription' || subscriptionStatus === 'error') {
    return <Navigate to="/subscription-selection" />;
  }

  return children;
};

export default PrivateRoute;
