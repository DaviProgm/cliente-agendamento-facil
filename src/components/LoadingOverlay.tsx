import { useLoading } from "@/contexts/LoadingContext";

const LoadingOverlay = () => {
  const { isLoading } = useLoading();
  console.log("LoadingOverlay rendering. isLoading:", isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <h1 className="text-6xl font-extrabold tracking-tight workgate-fill-animation">
        WORKGATE
      </h1>
    </div>
  );
};

export default LoadingOverlay;
