// Simple interface for vote data
interface VoteData {
  userId: string;
  candidateId: string;
  timestamp: number;
  referenceNumber: string;
}

export const saveVote = (userId: string, candidateId: string, referenceNumber: string): void => {
  const voteData: VoteData = {
    userId,
    candidateId,
    timestamp: Date.now(),
    referenceNumber,
  };
  
  localStorage.setItem('userVote', JSON.stringify(voteData));
};

export const hasUserVoted = (): boolean => {
  const voteData = localStorage.getItem('userVote');
  return voteData !== null;
};

export const getUserVote = (): VoteData | null => {
  const voteData = localStorage.getItem('userVote');
  return voteData ? JSON.parse(voteData) : null;
};