"use client";

import { CalendarHeart, LogOut, Sparkles, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { logout } from "@/lib/auth/actions";
import { useUser } from "@/lib/auth/hooks";

export function Navbar() {
  const { user, loading } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="bg-cream/90 backdrop-blur-md border-b border-warm-gray/10 py-4 px-6 fixed top-0 w-full z-40 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Sparkles className="w-6 h-6 text-terracotta group-hover:scale-105 transition-transform" />
            <span className="font-serif text-2xl text-ink font-medium">
              Wishena
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {!loading && !user && (
              <Link
                href="/auth/login"
                className="text-sm font-medium text-ink hover:text-terracotta transition-colors px-4 py-2 border border-transparent hover:border-warm-gray/20 rounded-xl"
              >
                Log in
              </Link>
            )}

            {!loading && user && (
              <div className="flex items-center gap-6">
                <Link
                  href="/invites"
                  className="text-sm font-medium text-ink hover:text-terracotta transition-colors flex items-center gap-1.5"
                >
                  <CalendarHeart className="w-4 h-4" />
                  Invites
                </Link>
                <Link
                  href="/my-wishes"
                  className="text-sm font-medium text-ink hover:text-terracotta transition-colors"
                >
                  My Wishes
                </Link>

                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-warm-gray/20 text-ink hover:bg-warm-gray/30 transition-colors focus:outline-none"
                  >
                    <User className="w-4 h-4" />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-warm-gray/20 shadow-xl rounded-2xl overflow-hidden py-1">
                      <div className="px-4 py-3 border-b border-warm-gray/10 bg-off-white">
                        <p className="text-xs font-medium text-ink">
                          Signed in as
                        </p>
                        <p className="text-xs text-warm-gray-text truncate mt-0.5">
                          {user.email}
                        </p>
                        {!user.email_confirmed_at && (
                          <span className="mt-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-red-100 text-red-800">
                            Unverified
                          </span>
                        )}
                      </div>
                      <div className="py-1">
                        <button
                          type="button"
                          onClick={() => {
                            setDropdownOpen(false);
                            logout();
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-ink hover:bg-gray-50 flex items-center gap-2 transition-colors"
                        >
                          <LogOut className="w-4 h-4 text-warm-gray-text" />
                          Log out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
      {/* Spacer to prevent content from going under the fixed navbar */}
      <div className="h-[73px]" />
    </>
  );
}
