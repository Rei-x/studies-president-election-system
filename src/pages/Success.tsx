import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { NavigationBar } from "@/components/NavigationBar";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const referenceNumber = location.state?.referenceNumber;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <NavigationBar />
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        <div className="space-y-1 text-center">
          <h1 className="text-[22px] font-normal">
            Głosowanie na prezydenta 202x
          </h1>
          <div className="text-sm space-y-0.5">
            <p>Status: Aktywne</p>
            <p>Zamyka się: xx.xx.xxxx xx:xx</p>
          </div>
        </div>

        <hr className="border-t border-gray-300" />

        <div className="space-y-4 text-center">
          <h2 className="text-xl font-bold">
            Twój głos został pomyślnie oddany!
          </h2>
          <div className="space-y-1">
            <p className="text-base">Nr referencyjny głosu:</p>
            <p className="text-base font-mono">{referenceNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
