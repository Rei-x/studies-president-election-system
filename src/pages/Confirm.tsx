import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { NavigationBar } from "@/components/NavigationBar";
import { saveVote } from "@/utils/voteStorage";

const Confirm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const candidateId = location.state?.candidateId;

  const handleConfirm = () => {
    const referenceNumber = Math.random().toString(36).substring(2, 15);
    // For this example, we'll use a hardcoded userId. In a real app, this would come from authentication
    const userId = "user123";
    saveVote(userId, candidateId, referenceNumber);
    navigate("/success", {
      state: {
        referenceNumber,
      },
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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <NavigationBar />
      <div className="flex items-center justify-center p-4">
        <Card className="w-full max-w-xl">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl font-semibold">
              Głosowanie na prezydenta 202x
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              <div>Status: Aktywne</div>
              <div>Zamyka się: xx.xx.xxxx xxxx</div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-center">
                Podsumowanie wyboru
              </h2>
              <p className="text-center text-lg">
                Twój wybór:{" "}
                <span className="font-medium">Brak (głos nieważny)</span>
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