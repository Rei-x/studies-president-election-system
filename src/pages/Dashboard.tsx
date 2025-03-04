import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Vote, FileText, Database, Settings } from "lucide-react";
import { NavigationBar } from "@/components/NavigationBar";
import { getUserVote } from "@/utils/voteStorage";
import {
  getLoggedInUser,
  canUserVote,
  canUserReport,
  isAdmin,
} from "@/utils/auth";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
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

const Dashboard = () => {
  const navigate = useNavigate();
  const currentUser = getLoggedInUser();
  const [votings] = useVotings();
  const currentVoting = findActiveVoting(votings);

  const hasVoted = !!(currentUser && currentVoting?.userVotes[currentUser.id]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
      return;
    }
  }, [currentUser, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />

      <main className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Panel administracyjny systemu wyborczego
            </h1>

            <div className="grid gap-4 sm:grid-cols-2">
              {canUserVote(currentUser) && (
                <Card className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold">Głosowanie</h2>
                  {currentVoting ? (
                    hasVoted ? (
                      <div className="space-y-2">
                        <p className="text-green-600 font-medium">
                          Dziękujemy za oddanie głosu!
                        </p>
                      </div>
                    ) : (
                      <Button
                        onClick={() => navigate("/vote")}
                        className="w-full"
                        disabled={!currentVoting || hasVoted}
                      >
                        <Vote className="mr-2" />
                        Oddaj głos
                      </Button>
                    )
                  ) : (
                    <p className="text-sm text-gray-500">
                      Aktualnie nie ma aktywnego głosowania
                    </p>
                  )}
                </Card>
              )}

              {canUserReport(currentUser) && (
                <Card className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold">Raporty</h2>
                  <Button
                    onClick={() => navigate("/create-report")}
                    className="w-full"
                  >
                    <FileText className="mr-2" />
                    Utwórz raport
                  </Button>
                </Card>
              )}

              {isAdmin(currentUser) && (
                <>
                  <Card className="p-6 space-y-4">
                    <h2 className="text-xl font-semibold">
                      Zarządzanie głosowaniami
                    </h2>
                    <Button
                      onClick={() => navigate("/vote-management")}
                      className="w-full"
                    >
                      <Settings className="mr-2" />
                      Zarządzaj głosowaniami
                    </Button>
                  </Card>

                  <Card className="p-6 space-y-4">
                    <h2 className="text-xl font-semibold">
                      Zarządzanie systemem
                    </h2>
                    <Button
                      onClick={() => navigate("/backup-config")}
                      className="w-full"
                    >
                      <Database className="mr-2" />
                      Kopie zapasowe
                    </Button>
                  </Card>
                </>
              )}
            </div>
          </div>

          <div className="relative h-[400px] lg:h-[500px]">
            <img
              src="/image.png"
              alt="Ilustracja systemu wyborczego"
              className="object-contain"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
