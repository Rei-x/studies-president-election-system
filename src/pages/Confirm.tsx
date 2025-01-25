import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Confirm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const candidateId = location.state?.candidateId;

  const handleConfirm = () => {
    navigate("/success", { 
      state: { 
        referenceNumber: Math.random().toString(36).substring(2, 15) 
      } 
    });
  };

  if (!candidateId) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            No candidate selected. Please return to the voting page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-background to-muted">
      <div className="max-w-2xl mx-auto space-y-8 pt-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Confirm Your Vote</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Please review your selection before confirming
          </p>
        </div>

        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Your Selection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                Once confirmed, your vote cannot be changed.
              </AlertDescription>
            </Alert>
            
            <div className="flex justify-end space-x-4 mt-6">
              <Button variant="outline" onClick={() => navigate("/vote")}>
                Back
              </Button>
              <Button onClick={handleConfirm}>
                Confirm Vote
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Confirm;