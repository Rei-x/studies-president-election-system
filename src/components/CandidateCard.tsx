import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CandidateCardProps {
  name: string;
  party: string;
  selected?: boolean;
  onSelect: () => void;
}

export const CandidateCard = ({ name, party, selected, onSelect }: CandidateCardProps) => {
  return (
    <Card 
      className={cn(
        "relative cursor-pointer card-hover",
        selected && "ring-2 ring-primary"
      )}
      onClick={onSelect}
    >
      <CardHeader>
        <CardTitle className="text-xl">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{party}</p>
        {selected && (
          <div className="absolute top-4 right-4">
            <Check className="w-6 h-6 text-primary" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};