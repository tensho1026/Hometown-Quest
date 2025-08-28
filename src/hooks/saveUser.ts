'use client'

import { saveUserToDatabase } from "@/app/actions/auth/saveUser";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export const saveUser = async () => {
  const { user } = useUser();

  useEffect(() => {
    if (!user?.id) return;

    saveUserToDatabase({
      id: user.id,
      username: user.fullName,
      imageUrl: user.imageUrl,
    });
  }, [user]);
}