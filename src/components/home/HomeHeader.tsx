import { Bell, Heart, User } from "lucide-react";
import { Button } from "../ui/button";

function HomeHeader() {
  return (
    <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6" />
          <div>
            <h1 className="font-bold text-lg">わたしの地元</h1>
            <p className="text-sm opacity-90">今日も素敵な一日を！</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
          >
            <Bell className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
          >
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HomeHeader;
