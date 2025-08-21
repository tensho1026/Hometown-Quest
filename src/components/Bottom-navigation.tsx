"use client";

import { Button } from "@/components/ui/button";
import { link } from "fs";
import { MapPin, List, Bell } from "lucide-react";
import Link from "next/link";


export function BottomNavigation() {
  const navItems = [
    { id: "Home", label: "ホーム", icon: MapPin,link:'/'},
    { id: "Questlist", label: "クエスト", icon: List,link:'/QuestList' },
    { id: "Mypage", label: "マイページ", icon: Bell,link:'/Mypage' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-amber-200 shadow-lg">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const link = item.link
          const isActive =item.id;
          return (
            <Link href={link} key={item.id}>
            <Button
              variant="ghost"
              className={`flex flex-col items-center gap-1 p-2 h-auto ${
                isActive
                  ? "text-amber-600 bg-amber-50"
                  : "text-gray-600 hover:text-amber-600 hover:bg-amber-50"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
