import { atomWithStorage } from "jotai/utils";
import { withImmer } from "jotai-immer";
export interface Candidate {
  name: string;
  description: string;
}

export interface Voting {
  title: string;
  description: string;

  startDate: string;
  endDate: string;
  candidates: Candidate[];
  votes: Record<string, string>;
}

export const votings = withImmer(atomWithStorage<Voting[]>("votings", []));
