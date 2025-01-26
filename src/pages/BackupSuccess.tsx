import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const BackupSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-6 space-y-6 text-center">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold">Kopia zapasowa utworzona</h1>
        <p className="text-gray-500">
          Kopia zapasowa została pomyślnie utworzona i zapisana w systemie.
        </p>
        <Button
          onClick={() => navigate("/backup-config")}
          className="w-full bg-blue-500 hover:bg-blue-600"
        >
          Powrót do konfiguracji
        </Button>
      </Card>
    </div>
  );
};

export default BackupSuccess;