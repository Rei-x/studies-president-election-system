import ConfirmVoting from "@/components/ConfirmVoting";
import { NavigationBar } from "@/components/NavigationBar";
import { useVotings } from "@/hooks/use-votings";
import { useNavigate, useParams } from "react-router-dom";

const DeleteVoting = () => {
  const params = useParams<{
    votingTitle: string;
  }>();
  const navigate = useNavigate();
  const [votings, setVotings] = useVotings();

  const voting = votings.find((v) => v.title === params.votingTitle);

  if (!voting) {
    navigate("/vote-management");
    return null;
  }

  const handleConfirm = () => {
    setVotings((currentVotings) =>
      currentVotings.filter((v) => v.title !== params.votingTitle)
    );
    navigate("/vote-management");
  };

  const handleCancel = () => {
    navigate("/vote-management");
  };

  return (
    <div>
      <NavigationBar />
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <ConfirmVoting
          mode="delete"
          votingName={voting.title}
          description={voting.description}
          startDate={voting.startDate}
          endDate={voting.endDate}
          candidates={voting.candidates.map((c) => c.name)}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default DeleteVoting;
