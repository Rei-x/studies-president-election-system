import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NavigationBar } from "@/components/NavigationBar";
import { useToast } from "@/hooks/use-toast";
import { Paperclip } from "lucide-react";
import { getLoggedInUser, canUserReport } from "@/utils/auth";

const CreateReport = () => {
  const [votingType, setVotingType] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentUser = getLoggedInUser();

  useEffect(() => {
    if (!currentUser || !canUserReport(currentUser)) {
      toast({
        title: "Brak dostępu",
        description: "Nie masz uprawnień do tworzenia raportów.",
        variant: "destructive",
      });
      navigate("/dashboard");
    }
  }, [currentUser, navigate, toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!votingType || !description) {
      toast({
        variant: "destructive",
        title: "Błąd",
        description: "Wypełnij wszystkie pola formularza",
      });
      return;
    }

    console.log("Report data:", { votingType, description });
    
    toast({
      title: "Sukces",
      description: "Raport został utworzony pomyślnie",
    });
    
    navigate("/report-success");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Nowy raport audytowy
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Głosowanie
              </label>
              <Select value={votingType} onValueChange={setVotingType}>
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz głosowanie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="presidential-2024">
                    Wybory Prezydenckie 2024
                  </SelectItem>
                  <SelectItem value="parliamentary-2024">
                    Wybory Parlamentarne 2024
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Opis
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Wprowadź opis raportu..."
                className="min-h-[200px]"
              />
            </div>

            <div className="space-y-4">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
              >
                <Paperclip className="mr-2" />
                Załącz
              </Button>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/dashboard")}
                >
                  Anuluj
                </Button>
                <Button type="submit">Zapisz</Button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateReport;