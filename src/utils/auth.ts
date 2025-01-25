export interface User {
  id: string;
  login: string;
  password: string;
  name: string;
}

export const users: User[] = [
  {
    id: "1",
    login: "jan.kowalski",
    password: "pass123",
    name: "Jan Kowalski"
  },
  {
    id: "2",
    login: "anna.nowak",
    password: "pass123",
    name: "Anna Nowak"
  },
  {
    id: "3",
    login: "piotr.wisniewski",
    password: "pass123",
    name: "Piotr Wiśniewski"
  },
  {
    id: "4",
    login: "maria.dabrowska",
    password: "pass123",
    name: "Maria Dąbrowska"
  },
  {
    id: "5",
    login: "tomasz.lewandowski",
    password: "pass123",
    name: "Tomasz Lewandowski"
  }
];

export const authenticateUser = (login: string, password: string): User | null => {
  const user = users.find(u => u.login === login && u.password === password);
  return user || null;
};

export const setLoggedInUser = (user: User) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const getLoggedInUser = (): User | null => {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
};

export const clearLoggedInUser = () => {
  localStorage.removeItem('currentUser');
};