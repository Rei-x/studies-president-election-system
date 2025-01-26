"use client";

import { useState } from "react";
import { NavigationBar } from "@/components/NavigationBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronRight } from "lucide-react";
import { useVotings } from "@/hooks/use-votings";
import { useNavigate } from "react-router-dom";

interface SelectVotingProps {
  mode: "edit" | "delete";
}

export default function SelectVoting({ mode }: SelectVotingProps) {
  const [votings] = useVotings();
  const [selectedVoting, setSelectedVoting] = useState<string>("");
  const navigate = useNavigate();

  const title =
    mode === "edit"
      ? "Wybierz głosowanie do edytowania"
      : "Wybierz głosowanie do usunięcia";

  const handleConfirm = () => {
    if (!selectedVoting) return;
    if (mode === "edit") {
      navigate(`/edit-voting/${selectedVoting}`);
    } else {
      // Handle deletion logic here
      navigate(`/delete-voting/${selectedVoting}`);
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-medium mb-6">{title}</h1>

        <RadioGroup
          value={selectedVoting}
          onValueChange={setSelectedVoting}
          className="space-y-4"
        >
          {votings.map((voting) => (
            <Card
              key={voting.title}
              className={`p-4 hover:bg-accent transition-colors cursor-pointer ${
                selectedVoting === voting.title ? "bg-accent" : ""
              }`}
              onClick={() => setSelectedVoting(voting.title)}
            >
              <div className="flex items-center gap-4">
                <RadioGroupItem
                  value={voting.title}
                  id={voting.title}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1.5">
                      <h3 className="text-lg font-medium">{voting.title}</h3>
                      <p className="text-muted-foreground">
                        {voting.description || "xxxxxxx"}
                      </p>
                      <p className="text-muted-foreground">
                        {voting.startDate} - {voting.endDate}
                      </p>
                    </div>
                    <ChevronRight className="text-muted-foreground" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </RadioGroup>

        <div className="flex justify-end gap-4 mt-8">
          <Button variant="outline" onClick={() => navigate("/")}>
            Anuluj
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedVoting}
            variant={mode === "delete" ? "destructive" : "default"}
          >
            {mode === "edit" ? "Edytuj" : "Usuń"}
          </Button>
        </div>
      </div>
    </>
  );
}
