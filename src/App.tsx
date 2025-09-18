import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner, toast } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import PrivateRoute from "@/components/DashboardCreditor/PrivateRoute";
import Register from "./pages/register";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./pages/homePage";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import PaymentRequired from "./pages/PaymentRequired";
import SubscriptionSelection from "./pages/SubscriptionSelection";
import PaymentSuccess from "./pages/PaymentSuccess";
import ForgotPassword from "./pages/ForgotPassword";
import About from "./pages/About";
import { useClarity } from "@/hooks/useClarity";
import { onMessageListener } from "./firebase";
import SupportBubble from "@/components/SupportBubble";

const queryClient = new QueryClient();

// Wrapper component to conditionally render the SupportBubble
const SupportBubbleWrapper = () => {
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const showBubble = token && !["/login", "/register"].includes(location.pathname);

  console.log("Support Bubble Debug:", {
    isTokenPresent: !!token,
    currentPath: location.pathname,
    shouldShowBubble: showBubble
  });

  return showBubble ? <SupportBubble /> : null;
};

// New component to wrap Routes and use useLocation
const AppRoutes = () => {
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/dashboard"
          element={<PrivateRoute><Dashboard /></PrivateRoute>}
          key={location.pathname}
        />
        <Route path="*" element={<NotFound />} />
        <Route path="/termos" element={<Terms />} />
        <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
        <Route path="/payment-required" element={<PaymentRequired />} />
        <Route path="/subscription-selection" element={<SubscriptionSelection />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/sobre" element={<About />} />
      </Routes>
      <SupportBubbleWrapper />
    </>
  );
};

const App = () => {
  // 🔍 Ativa Clarity com seu ID
  useClarity("soqsxg0usk");

  useEffect(() => {
    onMessageListener()
      .then((payload) => {
        toast.info(payload.notification.body, {
          description: payload.notification.title,
          action: {
            label: "Fechar",
            onClick: () => {},
          },
        });
      })
      .catch((err) => console.log("failed: ", err));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;