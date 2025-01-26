// Simple interface for vote data
interface VoteData {
  userId: string;
  candidateId: string;
  timestamp: number;
  referenceNumber: string;
}

const VOTES_STORAGE_KEY = "userVotes";

export const getUserVote = (): VoteData | null => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  if (!currentUser.id) return null;

  const votesStr = localStorage.getItem(VOTES_STORAGE_KEY);
  if (!votesStr) return null;

  const votes: VoteData[] = JSON.parse(votesStr);
  return votes.find((vote) => vote.userId === currentUser.id) || null;
};
