import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronRight, FileCheck } from "lucide-react";
import { NavigationBar } from "@/components/NavigationBar";

import { useToast } from "@/components/ui/use-toast";
import { getLoggedInUser, canUserVote } from "@/utils/auth";
import { useVotings } from "@/hooks/use-votings";
import type { Voting } from "@/atoms/votings";

const findActiveVoting = (votings: Voting[]) => {
  const now = new Date();
  return votings.find((voting) => {
    const startDate = new Date(voting.startDate);
    const endDate = new Date(voting.endDate);
    return now >= startDate && now <= endDate;
  });
};

const Vote = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<string>("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentUser = getLoggedInUser();
  const [votings] = useVotings();

  const currentVoting = findActiveVoting(votings);

  useEffect(() => {
    if (!currentVoting) {
      toast({
        title: "Błąd",
        description: "Nie znaleziono aktywnego głosowania.",
        variant: "destructive",
      });
      navigate("/dashboard");
      return;
    }

    if (!currentUser || !canUserVote(currentUser)) {
      toast({
        title: "Brak dostępu",
        description: "Nie masz uprawnień do głosowania.",
        variant: "destructive",
      });
      navigate("/dashboard");
      return;
    }
  }, [navigate, toast, currentUser, currentVoting]);

  const handleContinue = () => {
    if (selectedCandidate) {
      navigate("/confirm", {
        state: {
          candidateId: selectedCandidate,
          votingTitle: currentVoting?.title,
        },
      });
    }
  };

  if (!currentVoting) return null;

  return (
    <>
      <NavigationBar />
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold mb-1">{currentVoting.title}</h1>
          <p className="text-muted-foreground">
            Status:{" "}
            {new Date(currentVoting.endDate) > new Date()
              ? "Aktywne"
              : "Zakończone"}
          </p>
          <p className="text-sm text-muted-foreground">
            Zamyka się {new Date(currentVoting.endDate).toLocaleString()}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <RadioGroup
              value={selectedCandidate}
              onValueChange={setSelectedCandidate}
            >
              {currentVoting.candidates.map((candidate) => (
                <label
                  key={candidate.name}
                  className="flex items-center space-x-2 rounded-lg bg-muted p-4 cursor-pointer hover:bg-muted/80 transition-colors"
                >
                  <RadioGroupItem
                    value={candidate.name}
                    id={candidate.name}
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
                  Twój wybór: {selectedCandidate || "Brak (głos nieważny)"}
                </p>
                <div className="flex justify-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedCandidate("")}
                  >
                    Anuluj
                  </Button>
                  <Button onClick={handleContinue}>Dalej</Button>
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
