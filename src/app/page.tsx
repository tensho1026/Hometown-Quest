"use client";

import { HomeView } from "@/components/Home-view";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { saveUserToDatabase } from "./actions/auth/saveUser";

export default function JimotoQuest() {
  const { user } = useUser();

  useEffect(() => {
    if (!user?.id) return;

    saveUserToDatabase({
      id: user.id,
      username: user.fullName,
      imageUrl: user.imageUrl,
    });
  }, [user]);

  return (
    <div className="">
      <HomeView />
    </div>
  );
}
