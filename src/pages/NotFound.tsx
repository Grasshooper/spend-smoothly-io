
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-appBackground">
      <Header />
      
      <div className="page-container flex flex-col items-center justify-center min-h-screen">
        <DashboardCard className="w-full text-center p-8 max-w-sm animate-scale-in">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-xl font-medium text-textPrimary mb-6">Page not found</h2>
          <p className="text-textSecondary mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <button 
            className="btn-primary w-full flex items-center justify-center gap-2"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={18} />
            Return to Home
          </button>
        </DashboardCard>
      </div>
    </div>
  );
};

export default NotFound;
