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
import VotingInterface from "./pages/VoteManagement";
import AddVoting from "./pages/AddVoting";
import SelectVotingToEdit from "./pages/SelectVoting";
import DeleteVoting from "./pages/DeleteVoting";

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
            <Route path="/vote-management" element={<VotingInterface />} />
            <Route path="/add-voting" element={<AddVoting />} />
            <Route
              path="/edit-voting"
              element={<SelectVotingToEdit mode="edit" />}
            />
            <Route path="/edit-voting/:votingTitle" element={<AddVoting />} />
            <Route
              path="/delete-voting"
              element={<SelectVotingToEdit mode="delete" />}
            />
            <Route
              path="/delete-voting/:votingTitle"
              element={<DeleteVoting />}
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
