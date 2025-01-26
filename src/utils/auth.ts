export interface User {
  id: string;
  login: string;
  password: string;
  name: string;
  role: "voter" | "reporter" | "admin";
}

export const users: User[] = [
  {
    id: "1",
    login: "jan.kowalski",
    password: "pass123",
    name: "Jan Kowalski",
    role: "voter",
  },
  {
    id: "2",
    login: "anna.nowak",
    password: "pass123",
    name: "Anna Nowak",
    role: "voter",
  },
  {
    id: "3",
    login: "piotr.wisniewski",
    password: "pass123",
    name: "Piotr Wiśniewski",
    role: "voter",
  },
  {
    id: "4",
    login: "maria.dabrowska",
    password: "pass123",
    name: "Maria Dąbrowska",
    role: "reporter",
  },
  {
    id: "5",
    login: "tomasz.lewandowski",
    password: "pass123",
    name: "Tomasz Lewandowski",
    role: "reporter",
  },
  {
    id: "6",
    login: "admin",
    password: "admin123",
    name: "Administrator Systemu",
    role: "admin",
  },
];

export const authenticateUser = (
  login: string,
  password: string
): User | null => {
  const user = users.find((u) => u.login === login && u.password === password);
  return user || null;
};

export const setLoggedInUser = (user: User) => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

export const getLoggedInUser = (): User | null => {
  const userStr = localStorage.getItem("currentUser");
  return userStr ? JSON.parse(userStr) : null;
};

export const clearLoggedInUser = () => {
  localStorage.removeItem("currentUser");
};

export const canUserVote = (user: User | null): boolean => {
  return user?.role === "voter";
};

export const canUserReport = (user: User | null): boolean => {
  return user?.role === "reporter";
};

export const isAdmin = (user: User | null): boolean => {
  return user?.role === "admin";
};
