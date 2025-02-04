// util.ts
import { Voting } from "@/atoms/votings";
import { canUserVote, User } from "@/utils/auth";

/**
 * Stub function.
 * Returns true if the voter already voted in the given active voting.
 * (You will provide your own implementation later.)
 */
export function hasVotedAlready(voting: Voting, voterId: string): boolean {
    return voting.userVotes[voterId] !== undefined;
}


export const findActiveVoting = (votings: Voting[]) => {
    const now = new Date();
    return votings.find((voting) => {
        const startDate = new Date(voting.startDate);
        const endDate = new Date(voting.endDate);
        return now >= startDate && now <= endDate;
    });
};


/**
 * Checks if a vote is valid.
 * Conditions for a valid vote:
 *  1. There is an active voting.
 *  2. The candidate (by candidateId) exists in the candidates list.
 *  3. The user has not already voted in this voting.
 *  4. The user is allowed to vote.
 *
 * @param candidateId - The candidate ID selected by the voter.
 * @param currentUser - The current user who is voting.
 * @param votings - The list of all votings.
 * @returns true if the vote is valid, false otherwise.
 */
export function isValidVote(
    candidateId: string,
    currentUser: User,
    votings: Voting[]
): boolean {
    const activeVoting = findActiveVoting(votings);
    if (!activeVoting) return false;

    // Check candidate exists.
    const candidateExists = activeVoting.candidates.some(
        (candidate) => candidate.name === candidateId
    );
    if (!candidateExists && candidateId != "") return false;

    // Check if the user has already voted.
    if (hasVotedAlready(activeVoting, currentUser.id)) return false;

    // Check if the user is allowed to vote.
    if (!canUserVote(currentUser)) return false;

    return true;
}
