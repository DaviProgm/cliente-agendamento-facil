import { useLoading } from "@/contexts/LoadingContext";

const LoadingOverlay = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-main-background/80 backdrop-blur-sm">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-vibrant-accent border-t-transparent"></div>
    </div>
  );
};

export default LoadingOverlay;
