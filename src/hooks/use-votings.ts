import { votingsSingletone } from "@/atoms/votings";
import { useAtom } from "jotai/react";

export const useVotings = () => {
  return useAtom(votingsSingletone);
};
