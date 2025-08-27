"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  User,
  Camera,
  Heart,
  Clock,
  Footprints,
  BookOpen,
} from "lucide-react";

import { dailyQuestType } from "@/types/todayQuest";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { getTodayQuests } from "@/app/actions/getTodayQuests/getTodayQuests";
import { getMyHomeTownImage } from "@/app/actions/homeTownImage/getMyHomeTown";
import { changeMyHomeTownImage } from "@/app/actions/homeTownImage/changeImage";

export function HomeView() {
  const [dailyQuests, setDailyQuests] = useState<dailyQuestType[]>([]);
  const [hometownImage, setMyHometownImage] = useState<string | null>(null);
  const [imageLoadError, setImageLoadError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      const fetchHomeData = async () => {
        try {
          console.log("Fetching data for user:", user.id);
          const dailyQuest = await getTodayQuests(user.id);
          const myhomeTown = await getMyHomeTownImage(user.id);

          console.log("Retrieved image URL:", myhomeTown);

          setDailyQuests(dailyQuest);
          if (myhomeTown) {
            setMyHometownImage(myhomeTown);
            setImageLoadError(false);
          } else {
            setMyHometownImage(null);
            console.log("No image URL found for user");
          }
        } catch (error) {
          console.error("データ取得エラー:", error);
          setMyHometownImage(null);
          setImageLoadError(true);
        }
      };
      fetchHomeData();
    }
  }, [isLoaded, user]); // 依存配列からhometownImageを削除

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !user?.id) {
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("userId", user.id);

      console.log("Uploading image for user:", user.id);
      const newImageUrl = await changeMyHomeTownImage(formData);

      if (newImageUrl) {
        console.log("Setting new image URL:", newImageUrl);
        setMyHometownImage(newImageUrl);
        setImageLoadError(false);

        // アップロード成功後、データベースから最新の画像URLを再取得
        setTimeout(async () => {
          try {
            const latestImageUrl = await getMyHomeTownImage(user.id);
            console.log("Latest image URL from DB:", latestImageUrl);
            if (latestImageUrl) {
              setMyHometownImage(latestImageUrl);
            }
          } catch (error) {
            console.error("Failed to refresh image:", error);
          }
        }, 1000);
      }
    } catch (error) {
      console.error("画像アップロードエラー:", error);
      alert(
        error instanceof Error
          ? error.message
          : "画像のアップロードに失敗しました。"
      );
    } finally {
      setIsUploading(false);
      // ファイル選択をリセット
      event.target.value = "";
    }
  };

  const weeklyQuests = [
    {
      id: 4,
      title: "地元の新しいお店を発見",
      type: "探索",
      points: 100,
      difficulty: "普通",
      duration: "1時間",
      description: "まだ行ったことのない地元のお店を見つけて訪れてみよう",
      icon: "🏪",
      category: "exploration",
    },
    {
      id: 5,
      title: "地元の写真を3枚撮る",
      type: "記録",
      points: 80,
      difficulty: "普通",
      duration: "45分",
      description: "地元の素敵な風景や建物を3枚撮影しよう",
      icon: "📸",
      category: "photo",
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
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
              className="text-white hover:bg-white/20">
              <Bell className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-20">
        {/* Local Photo Section */}
        <div className="relative h-48 overflow-hidden bg-gray-200">
          {hometownImage ? (
            <img
              src={`${hometownImage}?t=${Date.now()}`}
              alt="地元の写真"
              className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
              onLoad={() => {
                console.log("Image loaded successfully:", hometownImage);
                setImageLoadError(false);
              }}
              onError={(e) => {
                console.error("Image load failed:", hometownImage, e);
                setImageLoadError(true);
              }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center">
              <div className="text-center text-white">
                <Camera className="w-12 h-12 mx-auto mb-2 opacity-60" />
                <p className="text-sm opacity-80">写真を追加してください</p>
              </div>
            </div>
          )}
          {hometownImage && (
            <div className="absolute inset-0 bg-black/20"></div>
          )}
          <div className="absolute bottom-4 right-4">
            <label htmlFor="file-upload">
              <Button
                size="sm"
                className="bg-white/90 text-gray-700 hover:bg-white"
                disabled={isUploading}>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 z-10 w-full h-full cursor-pointer opacity-0"
                  onChange={handleImageChange}
                  disabled={isUploading}
                />
                <Camera className="w-4 h-4 mr-2" />
                {isUploading ? "アップロード中..." : "写真を変更"}
              </Button>
            </label>
          </div>
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-xl font-bold drop-shadow-lg">今日の地元</h2>
            <p className="text-sm opacity-90 drop-shadow-lg">
              {hometownImage
                ? "あなたの大切な場所"
                : "写真を追加して地元を記録しよう"}
            </p>
          </div>

   
          
        </div>

        <div className="p-4 space-y-6">
          {/* Daily Quests */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-bold text-gray-800">
                今日のクエスト
              </h3>
              <Badge className="bg-amber-100 text-amber-700">毎日更新</Badge>
            </div>
            <div className="space-y-3">
              {dailyQuests.map((quest) => (
                <Link
                  href={`/QuestDetail/${quest.id}`}
                  key={`daily-${quest.id}`}>
                  <Card
                    className="border-2 border-amber-200 shadow-lg bg-white/95 backdrop-blur-sm cursor-pointer hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
                    // onClick={() => handleQuestClick(quest)}
                  >
                    <div className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-2xl">
                          {quest.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-gray-800">
                              {quest.title}
                            </h4>
                            <Badge
                              variant="outline"
                              className="border-amber-400 text-amber-700 text-xs">
                              {quest.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {quest.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {quest.timer}
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
                              {quest.point}pt
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Weekly Quests */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Footprints className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-bold text-gray-800">
                今週のチャレンジ
              </h3>
              <Badge className="bg-green-100 text-green-700">週替わり</Badge>
            </div>
            <div className="space-y-3">
              {weeklyQuests.map((quest) => (
                <Card
                  key={quest.id}
                  className="border-2 border-green-200 shadow-lg bg-white/95 backdrop-blur-sm cursor-pointer hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
                  // onClick={() => handleQuestClick(quest)}
                >
                  <div className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center text-2xl">
                        {quest.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-gray-800">
                            {quest.title}
                          </h4>
                          <Badge
                            variant="outline"
                            className="border-green-400 text-green-700 text-xs">
                            {quest.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {quest.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {quest.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                            {quest.points}pt
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
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
      </div>
    </div>
  );
}
