import { UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Settings, User } from "lucide-react";

function MyPageHeader() {
  return <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg">マイページ</h1>
              <p className="text-sm opacity-90">あなたの冒険記録</p>
            </div>
          </div>
          <UserButton/>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
}

export default MyPageHeader;
