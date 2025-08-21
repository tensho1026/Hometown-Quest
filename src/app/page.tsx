"use client";

import { BottomNavigation } from "@/components/Bottom-navigation";
import { HomeView } from "@/components/Home-view";
import { MyPage } from "@/components/my-page";
import { QuestDetail } from "@/components/Quest-details";
import { QuestList } from "@/components/QuestLists";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { saveUserToDatabase } from "./actions/auth/saveUser";
import Link from "next/link";

export default function JimotoQuest() {
  const { user } = useUser();
  console.log(user);


  useEffect(() => {
    if (!user?.id) return;

    saveUserToDatabase({
      id: user.id,
      username: user.fullName,
      imageUrl: user.imageUrl,
    });
  }, [user]);

  return <div className="">
    <HomeView/>
  </div>;
}
