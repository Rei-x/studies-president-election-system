import { NavigationBar } from "@/components/NavigationBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useVotings } from "@/hooks/use-votings";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function VotingInterface() {
  const [votings] = useVotings();
  const navigate = useNavigate();
  return (
    <>
      <NavigationBar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-medium mb-6">Glosowania</h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button
            onClick={() => {
              navigate("/add-voting");
            }}
            variant="outline"
            className="w-full sm:w-auto"
          >
            Dodaj głosowanie
          </Button>
          <Button
            onClick={() => {
              navigate("/edit-voting");
            }}
            variant="outline"
            className="w-full sm:w-auto"
          >
            Edytuj głosowanie
          </Button>
          <Button
            onClick={() => {
              navigate("/delete-voting");
            }}
            variant="outline"
            className="w-full sm:w-auto"
          >
            Usuń głosowanie
          </Button>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-medium">Aktualnie glosowania:</h2>
          {votings.map((voting) => (
            <Card
              key={voting.title}
              className="p-4 hover:bg-accent transition-colors cursor-pointer"
              onClick={() =>
                navigate(`/edit-voting/${encodeURIComponent(voting.title)}`)
              }
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1.5">
                  <h3 className="text-lg font-medium">{voting.title}</h3>
                  <p className="text-muted-foreground">
                    {voting.startDate} - {voting.endDate}
                  </p>
                </div>
                <ChevronRight className="text-muted-foreground" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
