import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronRight, FileCheck } from "lucide-react";
import { NavigationBar } from "@/components/NavigationBar";
import { hasUserVoted } from "@/utils/voteStorage";
import { useToast } from "@/components/ui/use-toast";
import { candidates } from "@/lib/candidates";

const Vote = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<string>("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (hasUserVoted()) {
      toast({
        title: "Już oddałeś głos",
        description: "Nie możesz głosować więcej niż jeden raz.",
        variant: "destructive",
      });
      navigate("/dashboard");
    }
  }, [navigate, toast]);

  const handleContinue = () => {
    if (selectedCandidate) {
      navigate("/confirm", { state: { candidateId: selectedCandidate } });
    }
  };

  return (
    <>
      <NavigationBar />

      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold mb-1">
            Głosowanie na prezydenta 202x
          </h1>
          <p className="text-muted-foreground">Status: Aktywne</p>
          <p className="text-sm text-muted-foreground">
            Zamyka się xx.xx.xxxx 20:xx
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <RadioGroup
              value={selectedCandidate}
              onValueChange={setSelectedCandidate}
            >
              {candidates.map((candidate) => (
                <label
                  key={candidate.id}
                  className="flex items-center space-x-2 rounded-lg bg-muted p-4 cursor-pointer hover:bg-muted/80 transition-colors"
                >
                  <RadioGroupItem
                    value={candidate.id}
                    id={candidate.id}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{candidate.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {candidate.description}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </label>
              ))}
            </RadioGroup>
          </div>

          <div className="relative rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 p-8">
            <div className="flex flex-col items-center justify-center space-y-6">
              <FileCheck className="h-20 w-20 text-muted-foreground" />
              <div className="text-center">
                <p className="mb-6">
                  Twój wybór:{" "}
                  {selectedCandidate
                    ? candidates.find((c) => c.id === selectedCandidate)?.name
                    : "Brak (głos nieważny)"}
                </p>
                <div className="flex justify-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedCandidate("")}
                  >
                    Anuluj
                  </Button>
                  <Button
                    onClick={() => {
                      handleContinue();
                    }}
                  >
                    Dalej
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vote;
