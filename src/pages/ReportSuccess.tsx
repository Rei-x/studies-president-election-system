import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NavigationBar } from "@/components/NavigationBar";

const ReportSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Raport audytowy utworzony pomyślnie
          </h1>
          
          <Button
            onClick={() => navigate("/dashboard")}
            className="mt-8"
          >
            Wróć
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ReportSuccess;