import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      toast({
        title: "Login successful",
        description: "Welcome to the voting system",
      });
      navigate("/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
    }
  };

  return (
    <div className="mx-auto max-w-sm space-y-6 p-4">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Logowanie do systemu
        </h1>
        <p className="text-sm text-muted-foreground">
          Wprowadź login i hasło aby zalogować się do systemu głosowania na
          prezydenta Rzeczpospolitej Polski.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            id="login"
            placeholder="Login"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="h-11 bg-gray-100/80"
          />
        </div>
        <div className="space-y-2">
          <Input
            id="password"
            placeholder="Hasło"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="h-11 bg-gray-100/80"
          />
        </div>
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white h-11">
          Zaloguj się
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              lub
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full h-11 bg-gray-100/80 hover:bg-gray-200/80"
        >
          Zaloguj się przez Profil zaufany
        </Button>
      </form>
    </div>
  );
};
