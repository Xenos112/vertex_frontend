"use client";

import MainPageLoader from "@/components/loaders/MainPageLoader";
import { useUserStore } from "@/store/user";
import { ReactNode, Suspense, useEffect } from "react";
Suspense;

export function UserContext({ children }: { children: ReactNode }) {
  const user = useUserStore((state) => state.user);
  const loading = useUserStore((state) => state.loading);
  const fetchUser = useUserStore((state) => state.fetchUser);

  useEffect(() => {
    const userFetcher = async () => {
      await fetchUser();
    };
    userFetcher();
  }, [fetchUser]);

  if (loading) {
    return <MainPageLoader />;
  }

  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
}

// fix: do it using the use function
