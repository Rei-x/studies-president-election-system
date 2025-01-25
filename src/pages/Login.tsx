import { LoginForm } from "@/components/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Presidential Voting</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Login to cast your vote
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;