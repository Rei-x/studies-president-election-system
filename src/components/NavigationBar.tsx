"use client";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AccessibilityIcon } from "lucide-react";

export function NavigationBar() {
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
          </div>
        </nav>
      </div>
    </header>
  );
}
