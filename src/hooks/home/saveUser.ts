"use client";

import { saveUserToDatabase } from "@/app/actions/auth/saveUser";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export function SaveUser() {
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user?.id) return;

    const run = async () => {
      // ClerkのfullNameがnullのこともあるので安全側に
      await saveUserToDatabase({
        id: user.id,
        username: user.fullName ?? user.username ?? user.firstName ?? null,
        imageUrl: user.imageUrl ?? null,
      });
    };
    void run();
  }, [isLoaded, isSignedIn, user?.id, user?.fullName, user?.imageUrl]);

  return null;
}
