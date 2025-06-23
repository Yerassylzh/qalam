"use client";

import {
  decryptToken,
  loadUserSessionFromCookies,
} from "@/features/authentication/lib/users/session";
import { TokenUser } from "@/types/session";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  user: TokenUser;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TokenUser | null>(null);

  useEffect(() => {
    const wrapper = async () => {
      const cookie = await loadUserSessionFromCookies();
      if (cookie) {
        const session = await decryptToken(cookie);
        if (session) {
          setUser(session.user);
        }
      }
    };
    wrapper();
  }, []);

  if (user === null) {
    return <div>Подождите...</div>;
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthContext");
  }
  return context;
};
