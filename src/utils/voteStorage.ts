// Simple interface for vote data
interface VoteData {
  userId: string;
  candidateId: string;
  timestamp: number;
  referenceNumber: string;
}

const VOTES_STORAGE_KEY = 'userVotes';

export const saveVote = (userId: string, candidateId: string, referenceNumber: string): void => {
  const voteData: VoteData = {
    userId,
    candidateId,
    timestamp: Date.now(),
    referenceNumber,
  };
  
  const existingVotesStr = localStorage.getItem(VOTES_STORAGE_KEY);
  const existingVotes: VoteData[] = existingVotesStr ? JSON.parse(existingVotesStr) : [];
  
  existingVotes.push(voteData);
  localStorage.setItem(VOTES_STORAGE_KEY, JSON.stringify(existingVotes));
};

export const hasUserVoted = (): boolean => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  if (!currentUser.id) return false;

  const votesStr = localStorage.getItem(VOTES_STORAGE_KEY);
  if (!votesStr) return false;

  const votes: VoteData[] = JSON.parse(votesStr);
  return votes.some(vote => vote.userId === currentUser.id);
};

export const getUserVote = (): VoteData | null => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  if (!currentUser.id) return null;

  const votesStr = localStorage.getItem(VOTES_STORAGE_KEY);
  if (!votesStr) return null;

  const votes: VoteData[] = JSON.parse(votesStr);
  return votes.find(vote => vote.userId === currentUser.id) || null;
};