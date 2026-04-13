"use client";

import type { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createClient } from "@/lib/supabase/client";

interface UserContextType {
  user: User | null;
}

const UserContext = createContext<UserContextType>({
  user: null,
});

export function UserProvider({
  serverUser,
  children,
}: {
  serverUser: User | null;
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(serverUser);
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();

  useEffect(() => {
    setUser(serverUser);
  }, [serverUser]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        router.refresh();
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, router]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
