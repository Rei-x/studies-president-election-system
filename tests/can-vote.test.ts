import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  User,
  authenticateUser,
  setLoggedInUser,
  getLoggedInUser,
  clearLoggedInUser,
  canUserVote,
  canUserReport,
  isAdmin,
  users,
} from "../src/utils/auth";

const databaseMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(globalThis, "localStorage", {
  value: databaseMock,
});

describe("User Authentication and Authorization", () => {
  beforeEach(() => {
    databaseMock.clear();
    vi.clearAllMocks();
  });

  describe("authenticateUser", () => {
    it("should return user when credentials are correct", () => {
      const result = authenticateUser("admin", "admin123");

      expect(result).toEqual(users[5]);
    });

    it("should return null when credentials are incorrect", () => {
      const result = authenticateUser("admin", "wrongpassword");

      expect(result).toBeNull();
    });

    it("should return null when user does not exist", () => {
      const result = authenticateUser("nonexistent", "password");
      expect(result).toBeNull();
    });
  });

  describe("localStorage operations", () => {
    const testUser: User = users[0];

    it("should set logged in user", () => {
      setLoggedInUser(testUser);

      expect(databaseMock.setItem).toHaveBeenCalledWith(
        "currentUser",
        JSON.stringify(testUser)
      );
    });

    it("should get logged in user", () => {
      databaseMock.getItem.mockReturnValue(JSON.stringify(testUser));

      const result = getLoggedInUser();

      expect(result).toEqual(testUser);
      expect(databaseMock.getItem).toHaveBeenCalledWith("currentUser");
    });

    it("should return null when no user is logged in", () => {
      databaseMock.getItem.mockReturnValue(null);

      const result = getLoggedInUser();
      expect(result).toBeNull();
    });

    it("should clear logged in user", () => {
      clearLoggedInUser();
      expect(databaseMock.removeItem).toHaveBeenCalledWith("currentUser");
    });
  });

  describe("User role checks", () => {
    it("should correctly identify voter role", () => {
      const voter = users.find((u) => u.role === "voter") ?? null;
      const reporter = users.find((u) => u.role === "reporter") ?? null;
      const admin = users.find((u) => u.role === "admin") ?? null;

      expect(canUserVote(voter)).toBe(true);
      expect(canUserVote(reporter)).toBe(false);
      expect(canUserVote(admin)).toBe(false);
      expect(canUserVote(null)).toBe(false);
    });

    it("should correctly identify reporter role", () => {
      const voter = users.find((u) => u.role === "voter") ?? null;
      const reporter = users.find((u) => u.role === "reporter") ?? null;
      const admin = users.find((u) => u.role === "admin") ?? null;

      expect(canUserReport(reporter)).toBe(true);
      expect(canUserReport(voter)).toBe(false);
      expect(canUserReport(admin)).toBe(false);
      expect(canUserReport(null)).toBe(false);
    });

    it("should correctly identify admin role", () => {
      const voter = users.find((u) => u.role === "voter") ?? null;
      const reporter = users.find((u) => u.role === "reporter") ?? null;
      const admin = users.find((u) => u.role === "admin") ?? null;

      expect(isAdmin(admin)).toBe(true);
      expect(isAdmin(voter)).toBe(false);
      expect(isAdmin(reporter)).toBe(false);
      expect(isAdmin(null)).toBe(false);
    });
  });
});
