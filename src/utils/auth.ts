export interface User {
  id: string;
  login: string;
  password: string;
  name: string;
  role: "voter" | "reporter" | "admin";
}

interface UserFactory {
  createUser(userData: Omit<User, "role">): User;
}

class VoterFactory implements UserFactory {
  createUser(userData: Omit<User, "role">): User {
    return { ...userData, role: "voter" };
  }
}

class ReporterFactory implements UserFactory {
  createUser(userData: Omit<User, "role">): User {
    return { ...userData, role: "reporter" };
  }
}

class AdminFactory implements UserFactory {
  createUser(userData: Omit<User, "role">): User {
    return { ...userData, role: "admin" };
  }
}

export const userFactories = {
  voter: new VoterFactory(),
  reporter: new ReporterFactory(),
  admin: new AdminFactory(),
};

export const users: User[] = [
  userFactories.voter.createUser({
    id: "1",
    login: "jan.kowalski",
    password: "pass123",
    name: "Jan Kowalski",
  }),
  userFactories.voter.createUser({
    id: "2",
    login: "anna.nowak",
    password: "pass123",
    name: "Anna Nowak",
  }),
  userFactories.voter.createUser({
    id: "3",
    login: "piotr.wisniewski",
    password: "pass123",
    name: "Piotr Wiśniewski",
  }),
  userFactories.reporter.createUser({
    id: "4",
    login: "maria.dabrowska",
    password: "pass123",
    name: "Maria Dąbrowska",
  }),
  userFactories.reporter.createUser({
    id: "5",
    login: "tomasz.lewandowski",
    password: "pass123",
    name: "Tomasz Lewandowski",
  }),
  userFactories.admin.createUser({
    id: "6",
    login: "admin",
    password: "admin123",
    name: "Administrator Systemu",
  }),
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
