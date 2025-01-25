import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CandidateCard } from "@/components/CandidateCard";

const candidates = [
  { id: 1, name: "John Smith", party: "Progressive Party" },
  { id: 2, name: "Sarah Johnson", party: "Conservative Party" },
  { id: 3, name: "Michael Brown", party: "Liberal Party" },
];

const Vote = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedCandidate) {
      navigate("/confirm", { state: { candidateId: selectedCandidate } });
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-background to-muted">
      <div className="max-w-4xl mx-auto space-y-8 pt-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Cast Your Vote</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Select your preferred candidate
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              name={candidate.name}
              party={candidate.party}
              selected={selectedCandidate === candidate.id}
              onSelect={() => setSelectedCandidate(candidate.id)}
            />
          ))}
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            Back
          </Button>
          <Button 
            onClick={handleContinue}
            disabled={!selectedCandidate}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Vote;