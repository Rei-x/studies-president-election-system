interface Candidate {
  id: string;
  name: string;
  description: string;
  party: string;
}

export const candidates: Candidate[] = [
  {
    id: "1",
    name: "Anna Nowak",
    party: "Partia Demokratyczna",
    description:
      "Priorytetem mojej kampanii jest zwiększenie nakładów na służbę zdrowia, wprowadzenie kompleksowej reformy edukacji oraz wsparcie dla odnawialnych źródeł energii.",
  },
  {
    id: "2",
    name: "Marek Wiśniewski",
    party: "Sojusz Liberalny",
    description:
      "Stawiam na rozwój przedsiębiorczości poprzez uproszczenie systemu podatkowego, wsparcie dla małych i średnich firm oraz inwestycje w innowacyjne technologie.",
  },
  {
    id: "3",
    name: "Krzysztof Adamski",
    party: "Centrum Konserwatywne",
    description:
      "Moim celem jest wzmocnienie tradycyjnych wartości, zwiększenie bezpieczeństwa kraju poprzez modernizację armii oraz rozwój programów wsparcia dla rodzin.",
  },
  {
    id: "4",
    name: "Barbara Kowalczyk",
    party: "Ruch Zielonych",
    description:
      "Koncentruję się na walce ze zmianami klimatycznymi, rozwoju transportu publicznego oraz ochronie środowiska naturalnego poprzez implementację programów ekologicznych.",
  },
];
