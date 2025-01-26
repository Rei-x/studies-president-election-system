import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Vote from "./pages/Vote";
import Success from "./pages/Success";
import Confirm from "./pages/Confirm";
import CreateReport from "./pages/CreateReport";
import ReportSuccess from "./pages/ReportSuccess";
import BackupConfig from "./pages/BackupConfig";
import BackupSuccess from "./pages/BackupSuccess";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/vote" element={<Vote />} />
            <Route path="/success" element={<Success />} />
            <Route path="/confirm" element={<Confirm />} />
            <Route path="/create-report" element={<CreateReport />} />
            <Route path="/report-success" element={<ReportSuccess />} />
            <Route path="/backup-config" element={<BackupConfig />} />
            <Route path="/backup-success" element={<BackupSuccess />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;