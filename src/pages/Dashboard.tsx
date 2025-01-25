import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Vote } from "lucide-react";
import { NavigationBar } from "@/components/NavigationBar";
import { hasUserVoted, getUserVote } from "@/utils/voteStorage";

const Dashboard = () => {
  const navigate = useNavigate();
  const userHasVoted = hasUserVoted();
  const userVote = getUserVote();

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />

      <main className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Witaj w systemie głosowania na Prezydenta RP!
            </h1>

            <div className="space-y-4 text-gray-600">
              <p>Bezpieczny, szybki i przejrzysty sposób na oddanie głosu.</p>
              <p>Twoja decyzja ma znaczenie – zdecyduj o przyszłości!</p>
            </div>

            <div className="space-y-4">
              {userHasVoted ? (
                <div className="space-y-2">
                  <p className="text-green-600 font-medium">
                    Oddałeś już swój głos!
                  </p>
                  <p className="text-sm text-gray-500">
                    Nr referencyjny: {userVote?.referenceNumber}
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-gray-600">
                    Głosuj teraz i miej wpływ na losy kraju!
                  </p>
                  <Button
                    onClick={() => navigate("/vote")}
                    size="lg"
                    className="w-full sm:w-auto text-lg"
                  >
                    Głosuj teraz!
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="relative h-[400px] lg:h-[500px]">
            <img
              src={`/image.png`}
              alt="Ilustracja głosowania"
              className="object-contain"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;