import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { NavigationBar } from "@/components/NavigationBar";
import { useVotings } from "@/hooks/use-votings";
import ConfirmVoting from "@/components/ConfirmVoting";
import type { Voting } from "@/atoms/votings";
import { useNavigate, useParams } from "react-router-dom";

interface Candidate {
  id: number;
  name: string;
  description: string;
}

export default function AddVoting() {
  const params = useParams<{ votingTitle?: string }>();
  const navigate = useNavigate();
  const [votings, setVotings] = useVotings();

  // Get existing voting if in edit mode
  const existingVoting = params.votingTitle
    ? votings.find((v) => v.title === params.votingTitle)
    : null;

  // Initialize state with existing voting data if available
  const [votingTitle, setVotingTitle] = useState(existingVoting?.title || "");
  const [votingDescription, setVotingDescription] = useState(
    existingVoting?.description || ""
  );

  // Parse dates for existing voting
  const initDates = () => {
    if (existingVoting) {
      const startDateTime = new Date(existingVoting.startDate);
      const endDateTime = new Date(existingVoting.endDate);

      return {
        startDate: startDateTime.toISOString().split("T")[0],
        startTime: startDateTime.toTimeString().slice(0, 5),
        endDate: endDateTime.toISOString().split("T")[0],
        endTime: endDateTime.toTimeString().slice(0, 5),
      };
    }
    return { startDate: "", startTime: "", endDate: "", endTime: "" };
  };

  const {
    startDate: initStartDate,
    startTime: initStartTime,
    endDate: initEndDate,
    endTime: initEndTime,
  } = initDates();

  const [startDate, setStartDate] = useState(initStartDate);
  const [startTime, setStartTime] = useState(initStartTime);
  const [endDate, setEndDate] = useState(initEndDate);
  const [endTime, setEndTime] = useState(initEndTime);

  // Initialize candidates with existing data
  const [candidates, setCandidates] = useState<Candidate[]>(
    existingVoting
      ? existingVoting.candidates.map((c, index) => ({
          id: index + 1,
          name: c.name,
          description: c.description,
        }))
      : [{ id: 1, name: "", description: "" }]
  );

  const [errors, setErrors] = useState({
    title: "",
    startDate: "",
    endDate: "",
    candidates: "",
  });

  const [showConfirm, setShowConfirm] = useState(false);
  const [validatedVoting, setValidatedVoting] = useState<Voting>(null);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: "",
      startDate: "",
      endDate: "",
      candidates: "",
    };

    if (!votingTitle.trim()) {
      newErrors.title = "Nazwa głosowania jest wymagana";
      isValid = false;
    }

    if (!startDate || !startTime) {
      newErrors.startDate = "Data i czas rozpoczęcia są wymagane";
      isValid = false;
    }

    if (!endDate || !endTime) {
      newErrors.endDate = "Data i czas zakończenia są wymagane";
      isValid = false;
    }

    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);

    if (startDateTime >= endDateTime) {
      newErrors.endDate =
        "Data zakończenia musi być późniejsza niż rozpoczęcia";
      isValid = false;
    }

    const validCandidates = candidates.filter((c) => c.name.trim());
    if (validCandidates.length < 2) {
      newErrors.candidates = "Wymaganych jest minimum 2 kandydatów";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const addCandidate = () => {
    setCandidates([
      ...candidates,
      { id: candidates.length + 1, name: "", description: "" },
    ]);
  };

  const removeCandidate = (id: number) => {
    if (candidates.length > 1) {
      setCandidates(candidates.filter((candidate) => candidate.id !== id));
    }
  };

  const updateCandidate = (
    id: number,
    field: keyof Candidate,
    value: string
  ) => {
    setCandidates(
      candidates.map((candidate) =>
        candidate.id === id ? { ...candidate, [field]: value } : candidate
      )
    );
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const startDateTime = `${startDate}T${startTime}`;
    const endDateTime = `${endDate}T${endTime}`;

    const votingData = {
      title: votingTitle,
      description: votingDescription,
      startDate: startDateTime,
      endDate: endDateTime,
      candidates: candidates
        .filter((c) => c.name.trim())
        .map(({ id, ...rest }) => rest),
      votes: existingVoting?.votes || {},
    };

    setValidatedVoting(votingData);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setVotings((votings) => {
      if (existingVoting) {
        // Update existing voting
        const index = votings.findIndex(
          (v) => v.title === existingVoting.title
        );
        if (index !== -1) {
          votings[index] = validatedVoting;
        }
      } else {
        // Add new voting
        votings.push(validatedVoting);
      }
    });

    navigate("/vote-management");
  };

  return (
    <div>
      <NavigationBar />
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <ConfirmVoting
            mode="create"
            votingName={validatedVoting.title}
            description={validatedVoting.description}
            startDate={validatedVoting.startDate}
            endDate={validatedVoting.endDate}
            candidates={validatedVoting.candidates.map((c) => c.name)}
            onConfirm={handleConfirm}
            onCancel={() => setShowConfirm(false)}
          />
        </div>
      )}
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Voting Details */}
          <div className="space-y-6">
            <h1 className="text-3xl font-medium">
              {existingVoting ? "Edytuj głosowanie" : "Dodaj głosowanie"}
            </h1>
            <div className="space-y-4">
              <div>
                <Input
                  placeholder="Nazwa głosowania"
                  className={`w-full ${errors.title ? "border-red-500" : ""}`}
                  value={votingTitle}
                  onChange={(e) => {
                    setVotingTitle(e.target.value);
                    setErrors({ ...errors, title: "" });
                  }}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>
              <Textarea
                placeholder="Opis"
                className="min-h-[150px]"
                value={votingDescription}
                onChange={(e) => setVotingDescription(e.target.value)}
              />
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Data rozpoczęcia
                  </label>
                  <div className="flex gap-4">
                    <div className="w-full">
                      <Input
                        type="date"
                        className={`w-full ${
                          errors.startDate ? "border-red-500" : ""
                        }`}
                        value={startDate}
                        onChange={(e) => {
                          setStartDate(e.target.value);
                          setErrors({ ...errors, startDate: "" });
                        }}
                      />
                    </div>
                    <Input
                      type="time"
                      className={`w-32 ${
                        errors.startDate ? "border-red-500" : ""
                      }`}
                      value={startTime}
                      onChange={(e) => {
                        setStartTime(e.target.value);
                        setErrors({ ...errors, startDate: "" });
                      }}
                    />
                  </div>
                  {errors.startDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.startDate}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Data zakończenia
                  </label>
                  <div className="flex gap-4">
                    <Input
                      type="date"
                      className={`w-full ${
                        errors.endDate ? "border-red-500" : ""
                      }`}
                      value={endDate}
                      onChange={(e) => {
                        setEndDate(e.target.value);
                        setErrors({ ...errors, endDate: "" });
                      }}
                    />
                    <Input
                      type="time"
                      className={`w-32 ${
                        errors.endDate ? "border-red-500" : ""
                      }`}
                      value={endTime}
                      onChange={(e) => {
                        setEndTime(e.target.value);
                        setErrors({ ...errors, endDate: "" });
                      }}
                    />
                  </div>
                  {errors.endDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.endDate}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Right Column - Candidates List */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-medium">Lista kandydatów</h2>
              <Button variant="outline" onClick={addCandidate}>
                Dodaj kandydata
              </Button>
            </div>
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-4">
                {candidates.map((candidate) => (
                  <Card key={candidate.id} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <Input
                        placeholder="Imię i nazwisko kandydata"
                        value={candidate.name}
                        onChange={(e) =>
                          updateCandidate(candidate.id, "name", e.target.value)
                        }
                      />
                      {candidates.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-2"
                          onClick={() => removeCandidate(candidate.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <Textarea
                      placeholder="Opis"
                      value={candidate.description}
                      onChange={(e) =>
                        updateCandidate(
                          candidate.id,
                          "description",
                          e.target.value
                        )
                      }
                    />
                  </Card>
                ))}
              </div>
            </ScrollArea>
            {errors.candidates && (
              <p className="text-red-500 text-sm mt-2">{errors.candidates}</p>
            )}
          </div>
        </div>
        {/* Bottom Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <Button
            variant="outline"
            onClick={() => navigate("/vote-management")}
          >
            Anuluj
          </Button>
          <Button onClick={handleSubmit}>
            {existingVoting ? "Zapisz zmiany" : "Potwierdź"}
          </Button>
        </div>
      </div>
    </div>
  );
}
