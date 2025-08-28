import { BookOpen } from "lucide-react";
import { Card } from "../ui/card";

function TodaysRecord() {
  return (
    <div>
      <Card className="border-2 border-purple-200 shadow-lg bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="p-4">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-600" />
            今日の記録
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">3</p>
              <p className="text-xs text-gray-600">達成クエスト</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-pink-600">180</p>
              <p className="text-xs text-gray-600">獲得ポイント</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">7</p>
              <p className="text-xs text-gray-600">連続日数</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default TodaysRecord;
