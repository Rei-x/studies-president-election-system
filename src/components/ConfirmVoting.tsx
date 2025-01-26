import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ConfirmVotingProps {
  mode: "create" | "delete" | "edit";
  votingName: string;
  description: string;
  startDate: string;
  endDate: string;
  candidates: string[];
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmVoting({
  mode = "create",
  votingName = "xxxxxxxxxxxxx",
  description = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  startDate = "xx/xx/xxxx",
  endDate = "xx/xx/xxxx",
  candidates = ["Jan Kowalski", "Jan Kowalski", "Jan Kowalski"],
  onConfirm,
  onCancel,
}: ConfirmVotingProps) {
  const title = {
    create: "Potwierdź dodanie głosowania",
    delete: "Czy na pewno chcesz usunąć to głosowanie?",
    edit: "Potwierdź edycję głosowania",
  }[mode];

  return (
    <Card
      className={`max-w-2xl mx-auto p-6 ${
        mode === "delete" ? "border-destructive" : ""
      }`}
    >
      <div className="space-y-6">
        <h1
          className={`text-3xl font-medium ${
            mode === "delete" ? "text-destructive" : ""
          }`}
        >
          {title}
        </h1>

        <div className="space-y-4">
          <div>
            <h2 className="text-lg text-muted-foreground">
              Nazwa głosowania: {votingName}
            </h2>
          </div>

          <div>
            <h2 className="text-lg text-muted-foreground">Opis:</h2>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {description}
            </p>
          </div>

          <div>
            <h2 className="text-lg text-muted-foreground">
              Data rozpoczęcia: {startDate}
            </h2>
          </div>

          <div>
            <h2 className="text-lg text-muted-foreground">
              Data zakończenia: {endDate}
            </h2>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-2">Lista kandydatów:</h2>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {candidates.map((candidate, index) => (
                <li key={index}>{candidate}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button variant="outline" onClick={onCancel}>
            Anuluj
          </Button>
          <Button
            onClick={onConfirm}
            variant={mode === "delete" ? "destructive" : "default"}
          >
            {mode === "delete" ? "Usuń" : "Potwierdź"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
