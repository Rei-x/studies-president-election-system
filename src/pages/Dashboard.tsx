import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Vote } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-background to-muted">
      <div className="max-w-4xl mx-auto space-y-8 pt-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Welcome to the Voting System</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Your voice matters - cast your vote today
          </p>
        </div>

        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Election Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Status:</span>
                <span className="text-green-600 font-medium">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Closing Date:</span>
                <span>December 31, 2024</span>
              </div>
              <Button 
                className="w-full mt-4"
                onClick={() => navigate("/vote")}
              >
                <Vote className="mr-2 h-4 w-4" />
                Start Voting
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;