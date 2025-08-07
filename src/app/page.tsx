"use client"

import { BottomNavigation } from "@/components/Bottom-navigation"
import { HomeView } from "@/components/Home-view"
import { MyPage } from "@/components/my-page"
import { QuestDetail } from "@/components/Quest-details"
import { QuestList } from "@/components/QuestLists"
import { useState } from "react"

export default function JimotoQuest() {
  const [currentView, setCurrentView] = useState<"home" | "quest" | "questlist" | "mypage">("home") // Update currentView type
  const [selectedQuest, setSelectedQuest] = useState<any>(null)

  const renderCurrentView = () => {
    switch (currentView) {
      case "home":
        return <HomeView onQuestSelect={setSelectedQuest} onViewChange={setCurrentView} /> // Insert HomeView rendering
      case "quest":
        return <QuestDetail quest={selectedQuest} onBack={() => setCurrentView("home")} /> // Update onBack to "home"
      case "questlist":
        return <QuestList onQuestSelect={setSelectedQuest} onViewChange={setCurrentView} /> // Insert QuestList rendering
      case "mypage":
        return <MyPage />
      default:
        return <HomeView onQuestSelect={setSelectedQuest} onViewChange={setCurrentView} /> // Insert HomeView rendering
    }
  }

  return (
    <div className="min-h-screen bg-amber-50">
      {renderCurrentView()}
      <BottomNavigation currentView={currentView} onViewChange={setCurrentView} />
    </div>
  )
}
