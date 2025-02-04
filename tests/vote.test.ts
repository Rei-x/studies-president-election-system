// util.test.ts
import { describe, it, expect, vi, afterEach } from "vitest";
import { User } from "../src/utils/auth";
import { Voting } from "../src/atoms/votings";
import { candidates } from "../src/lib/candidates";
import { isValidVote } from "../src/lib/voteUtils";

// Create a dummy user for testing.
const dummyUser: User = { id: "user1", name: "John Doe", role: "voter", login: "johndoe", password: "asdasdasdasd" };

const admin = { id: "admin", name: "Admin", role: "admin", login: "admin", password: "admin123" };

// Helper function to get ISO strings for dates relative to now.
function isoDateOffset(daysOffset: number): string {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    return date.toISOString();
}

// Create an active voting: start date in the past and end date in the future.
const activeVoting: Voting = {
    title: "2025 Presidential Election",
    description: "Election for the next president.",
    startDate: isoDateOffset(-1), // yesterday
    endDate: isoDateOffset(1),    // tomorrow
    candidates: candidates, // using our global candidates list
    votes: {},
    userVotes: {},
};

// Create an inactive voting: both start and end dates are in the past.
const inactiveVoting: Voting = {
    title: "Old Election",
    description: "An old election.",
    startDate: "2000-01-01T00:00:00.000Z",
    endDate: "2000-01-02T00:00:00.000Z",
    candidates: candidates,
    votes: {},
    userVotes: {},
};

describe("isValidVote", () => {
    // After each test, restore any spied/mocked functions.
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("should return false if there is no active voting", () => {
        const votings: Voting[] = [inactiveVoting];
        const result = isValidVote("1", dummyUser, votings);
        expect(result).toBe(false);
    });

    it("should return false if the candidate does not exist in the active voting", () => {
        const votings: Voting[] = [activeVoting];
        // Use a candidateId that is not present in activeVoting.candidates.
        const invalidCandidateId = "Nieznany kandydat";
        const result = isValidVote(invalidCandidateId, dummyUser, votings);
        expect(result).toBe(false);
    });

    it("should return false if the user has already voted", () => {
        const votings: Voting[] = [activeVoting];
        // Override hasVotedAlready to simulate that the user already voted.

        activeVoting.userVotes[dummyUser.id] = "123456";
        const result = isValidVote("1", dummyUser, votings);
        expect(result).toBe(false);

        delete activeVoting.userVotes[dummyUser.id];

    });

    it("should return false if the user is not allowed to vote", () => {
        const votings: Voting[] = [activeVoting];

        const result = isValidVote("1", admin, votings);
        expect(result).toBe(false);
    });

    it("should return true if all conditions are met", () => {
        const votings: Voting[] = [activeVoting];

        // Use a valid candidate id from the activeVoting candidates list.
        const validCandidateId = activeVoting.candidates[0].name;
        const result = isValidVote(validCandidateId, dummyUser, votings);
        expect(result).toBe(true);
    });

    it("should return true if candidateId is empty (abstention vote) and other conditions are met", () => {
        const votings: Voting[] = [activeVoting];

        // When candidateId is an empty string, it should be considered a valid vote.
        const result = isValidVote("", dummyUser, votings);
        expect(result).toBe(true);
    });
});
