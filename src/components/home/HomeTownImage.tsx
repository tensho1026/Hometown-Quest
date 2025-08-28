"use client";

import { Camera } from "lucide-react";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { UserResource } from "@clerk/types";
import { changeMyHomeTownImage } from "@/app/actions/homeTownImage/changeImage";

interface HomeTownImageProps {
  user: UserResource | null | undefined;
  currentImage: string | null;
}

function HomeTownImage({ user, currentImage }: HomeTownImageProps) {
  const [hometownImage, setMyHometownImage] = useState<string | null>(currentImage);
  const [isUploading, setIsUploading] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);

  // 親コンポーネントから渡された画像が変更された場合に、内部ステートを同期する
  useEffect(() => {
    setMyHometownImage(currentImage);
  }, [currentImage]);

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
      formData.append("userId", user.id); // userIdをServer Actionに渡す

      const newImageUrl = await changeMyHomeTownImage(formData);
      
      if (newImageUrl) {
        setMyHometownImage(newImageUrl);
        setImageLoadError(false);
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
      event.target.value = "";
    }
  };

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      <div className="relative h-48 overflow-hidden bg-gray-200">
        {hometownImage ? (
          <img
            src={hometownImage}
            alt="地元の写真"
            className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
            onLoad={() => setImageLoadError(false)}
            onError={() => setImageLoadError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center">
            <div className="text-center text-white">
              <Camera className="w-12 h-12 mx-auto mb-2 opacity-60" />
              <p className="text-sm opacity-80">写真を追加してください</p>
            </div>
          </div>
        )}
        {hometownImage && <div className="absolute inset-0 bg-black/20"></div>}
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
        {imageLoadError && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <p className="text-white text-sm">画像の読み込みに失敗しました。</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeTownImage;