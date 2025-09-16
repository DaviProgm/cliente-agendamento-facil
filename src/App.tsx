import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner, toast } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import PrivateRoute from "@/components/DashboardCreditor/PrivateRoute";
import Register from "./pages/register";
import Assinatura from "./pages/Assinatura";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./pages/homePage";
import { useClarity } from "@/hooks/useClarity";
import { onMessageListener } from "./firebase";

const queryClient = new QueryClient();

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
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/register"
              element={<Register />}
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/assinatura"
              element={
                <PrivateRoute>
                  <Assinatura />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
