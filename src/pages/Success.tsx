import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const referenceNumber = location.state?.referenceNumber;

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-background to-muted">
      <div className="max-w-2xl mx-auto space-y-8 pt-8">
        <Card className="glass-panel text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl">Vote Successfully Cast!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Your vote has been recorded. Here's your reference number:
            </p>
            <p className="text-xl font-mono font-medium">
              {referenceNumber}
            </p>
            <Button 
              className="mt-6"
              onClick={() => navigate("/dashboard")}
            >
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Success;