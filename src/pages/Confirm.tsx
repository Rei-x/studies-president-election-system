import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { NavigationBar } from "@/components/NavigationBar";

import { getLoggedInUser } from "@/utils/auth";
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

const Confirm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [votings, setVotings] = useVotings();
  const currentVoting = findActiveVoting(votings);
  const candidateName = location.state?.candidateId;

  const handleConfirm = () => {
    const referenceNumber = Math.random().toString(36).substring(2, 15);
    const userId = getLoggedInUser()?.id;

    if (!userId || !currentVoting) {
      navigate("/dashboard");
      return;
    }

    setVotings((votings) => {
      const vote = findActiveVoting(votings);

      vote.userVotes[userId] = referenceNumber;
      vote.votes[referenceNumber] = candidateName;
    });
    navigate("/success", {
      state: {
        referenceNumber,
        votingTitle: currentVoting.title,
      },
    });
  };

  if (!candidateName || !currentVoting) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            No candidate selected or no active voting. Please return to the
            voting page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <NavigationBar />
      <div className="flex items-center justify-center p-4">
        <Card className="w-full max-w-xl">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl font-semibold">
              {currentVoting.title}
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              <div>
                Status:{" "}
                {new Date(currentVoting.endDate) > new Date()
                  ? "Aktywne"
                  : "Zakończone"}
              </div>
              <div>
                Zamyka się: {new Date(currentVoting.endDate).toLocaleString()}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-center">
                Podsumowanie wyboru
              </h2>
              <p className="text-center text-lg">
                Twój wybór:{" "}
                <span className="font-medium">
                  {candidateName || "Brak (głos nieważny)"}
                </span>
              </p>
            </div>

            <div className="space-y-4 text-center">
              <h3 className="text-lg font-medium">
                Czy na pewno chcesz oddać głos?
              </h3>
              <p className="text-sm text-muted-foreground">
                Po potwierdzeniu oddania głosu, nie będziesz już mógł zmienić
                decyzji!
              </p>
              <div className="flex justify-center gap-4 pt-4">
                <Button
                  variant="outline"
                  className="w-32"
                  onClick={() => navigate("/vote")}
                >
                  Anuluj
                </Button>
                <Button
                  onClick={handleConfirm}
                  className="w-32"
                  variant="default"
                >
                  Potwierdź
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Confirm;
