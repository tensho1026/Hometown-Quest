"use client"

import { Button } from "@/components/ui/button"
import { MapPin, List, Bell } from 'lucide-react'

interface BottomNavigationProps {
  currentView: string
  onViewChange: (view: "home" | "quest" | "questlist" | "mypage") => void
}

export function BottomNavigation({ currentView, onViewChange }: BottomNavigationProps) {
  const navItems = [
    { id: "home", label: "ホーム", icon: MapPin },
    { id: "questlist", label: "クエスト", icon: List },
    { id: "mypage", label: "マイページ", icon: Bell },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-amber-200 shadow-lg">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentView === item.id
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={`flex flex-col items-center gap-1 p-2 h-auto ${
                isActive ? "text-amber-600 bg-amber-50" : "text-gray-600 hover:text-amber-600 hover:bg-amber-50"
              }`}
              onClick={() => onViewChange(item.id as any)}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
