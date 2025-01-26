import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { NavigationBar } from "@/components/NavigationBar";
import { useToast } from "@/hooks/use-toast";

const BackupConfig = () => {
  const [backupType, setBackupType] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [isBackupInProgress, setIsBackupInProgress] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleBackup = () => {
    if (!backupType) {
      toast({
        variant: "destructive",
        title: "Błąd",
        description: "Wybierz typ kopii zapasowej",
      });
      return;
    }

    setIsBackupInProgress(true);
    let currentProgress = 0;

    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsBackupInProgress(false);
        navigate("/backup-success");
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      
      <main className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto p-6 space-y-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Kopie zapasowe</h1>
            <p className="text-gray-500">
              Data ostatniej kopii zapasowej: {new Date().toLocaleDateString()}
            </p>
          </div>

          <Button
            variant="outline"
            className="w-full justify-start h-11"
            onClick={() => window.open("#")}
          >
            Harmonogram
          </Button>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              Manualne tworzenie kopii zapasowej:
            </h2>
            <RadioGroup
              value={backupType}
              onValueChange={setBackupType}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="full" id="full" />
                <Label htmlFor="full">Pełna</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="incremental" id="incremental" />
                <Label htmlFor="incremental">Przyrostowa</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="differential" id="differential" />
                <Label htmlFor="differential">Różnicowa</Label>
              </div>
            </RadioGroup>
          </div>

          {isBackupInProgress && (
            <div className="space-y-2">
              <Progress value={progress} />
              <p className="text-sm text-gray-500">Postęp: {progress}%</p>
            </div>
          )}

          <Button
            onClick={handleBackup}
            className="w-full bg-blue-500 hover:bg-blue-600"
            disabled={isBackupInProgress}
          >
            {isBackupInProgress ? "Tworzenie kopii..." : "Utwórz kopię zapasową"}
          </Button>
        </Card>
      </main>
    </div>
  );
};

export default BackupConfig;