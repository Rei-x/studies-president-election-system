import { atomWithStorage } from "jotai/utils";
import { withImmer } from "jotai-immer";
import { startOfMonth, endOfMonth } from "date-fns";
import { candidates } from "@/lib/candidates";
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
  userVotes: Record<string, string>;
}

export const votingsSingletone = withImmer(
  atomWithStorage<Voting[]>("votings", [
    {
      title: "Głosowanie na prezydenta 2025",
      candidates: candidates,
      description:
        "Wybierz prezydenta na 2025 rok. Wybory prezydenckie w Polsce w 2025 roku będą kluczowym wydarzeniem politycznym, które zadecyduje o przyszłości kraju na kolejne lata. Wybory te będą okazją dla obywateli do wyrażenia swojego zdania na temat kierunku, w jakim powinna zmierzać Polska. Kandydaci będą prezentować swoje programy wyborcze, które obejmują różne aspekty życia społecznego, gospodarczego i politycznego. Wybory te będą również testem dla demokracji w Polsce, pokazującym, jak silne są instytucje demokratyczne i jak skutecznie potrafią one działać w obliczu wyzwań. Każdy głos ma znaczenie, dlatego zachęcamy wszystkich uprawnionych do głosowania do wzięcia udziału w wyborach i oddania swojego głosu na kandydata, który ich zdaniem najlepiej reprezentuje ich wartości i wizję przyszłości Polski.",
      startDate: startOfMonth(new Date()).toISOString(),
      endDate: endOfMonth(new Date()).toISOString(),
      votes: {},
      userVotes: {},
    },
  ])
);
