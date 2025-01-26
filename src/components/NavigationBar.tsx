"use client";

import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AccessibilityIcon } from "lucide-react";
import { clearLoggedInUser, getLoggedInUser, isAdmin } from "@/utils/auth";

export function NavigationBar() {
  const user = getLoggedInUser();
  const navigate = useNavigate();

  const isAdminUser = isAdmin(user);
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <div className="flex gap-4">
            <Link
              to="/dashboard"
              className="text-sm font-medium text-gray-900 hover:text-gray-600"
            >
              Głosowanie
            </Link>
            {isAdminUser && (
              <Link
                to="/vote-management"
                className="text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                Zarządzanie głosowaniem
              </Link>
            )}
            <Link
              to="/"
              className="text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              Pomoc
            </Link>
            <Link
              to="/"
              className="text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              Kontakt
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-900"
            >
              <AccessibilityIcon className="h-4 w-4 mr-2" />
              Ułatwienia dostępu
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Język:</span>
              <Button variant="ghost" size="sm" className="font-medium">
                PL 🇵🇱
              </Button>
            </div>
            <Button
              onClick={() => {
                clearLoggedInUser();
                navigate("/");
              }}
              variant="outline"
            >
              Wyloguj się
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
