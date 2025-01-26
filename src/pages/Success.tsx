import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { NavigationBar } from "@/components/NavigationBar";
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

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [votings] = useVotings();
  const currentVoting = findActiveVoting(votings);
  const referenceNumber = location.state?.referenceNumber;

  if (!currentVoting) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <NavigationBar />
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        <div className="space-y-1 text-center">
          <h1 className="text-[22px] font-normal">{currentVoting.title}</h1>
          <div className="text-sm space-y-0.5">
            <p>
              Status:{" "}
              {new Date(currentVoting.endDate) > new Date()
                ? "Aktywne"
                : "Zakończone"}
            </p>
            <p>
              Zamyka się: {new Date(currentVoting.endDate).toLocaleString()}
            </p>
          </div>
        </div>

        <hr className="border-t border-gray-300" />

        <div className="space-y-4 text-center">
          <h2 className="text-xl font-bold">
            Twój głos został pomyślnie oddany!
          </h2>
          <div className="space-y-1">
            <p className="text-base">Nr referencyjny głosu:</p>
            <p className="text-base font-mono">{referenceNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
