import { LoginForm } from "@/components/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted">
      <div className="w-full max-w-md space-y-8">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
