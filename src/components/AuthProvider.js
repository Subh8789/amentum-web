"use client";

import { SessionProvider, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function AuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export function AutoLogout() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;

    const timeout = setTimeout(() => {
      signOut();
    }, 2 * 60 * 1000); // Auto logout after 2 minutes

    return () => clearTimeout(timeout);
  }, [session]);

  return null;
}
