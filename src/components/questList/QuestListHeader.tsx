import { List } from "lucide-react"

function QuestListHeader() {
  return (
       <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <List className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg">クエスト一覧</h1>
            <p className="text-sm opacity-90">あなたの冒険を管理しよう</p>
          </div>
        </div>
      </div>
  )
}

export default QuestListHeader
