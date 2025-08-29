// src/hooks/useHomeTownImageUploader.ts
import { useState, useEffect } from "react";
import { UserResource } from "@clerk/types";
import { changeMyHomeTownImage } from "@/app/actions/homeTownImage/changeImage";

interface UseHomeTownImageUploaderProps {
  user: UserResource | null | undefined;
  initialImage: string | null;
}

export const useHomeTownImageUploader = ({
  user,
  initialImage,
}: UseHomeTownImageUploaderProps) => {
  const [hometownImage, setMyHometownImage] = useState<string | null>(
    initialImage
  );
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMyHometownImage(initialImage);
  }, [initialImage]);

  const handleImageChange = async (file: File | undefined) => {
    if (!file || !user?.id) {
      setError("ファイルまたはユーザーIDがありません。");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("userId", user.id);

      const newImageUrl = await changeMyHomeTownImage(formData);
      if (newImageUrl) {
        setMyHometownImage(newImageUrl);
      }
    } catch (err) {
      console.error("画像アップロードエラー:", err);
      setError(
        err instanceof Error ? err.message : "画像のアップロードに失敗しました。"
      );
    } finally {
      setIsUploading(false);
    }
  };

  return {
    hometownImage,
    isUploading,
    error,
    handleImageChange,
  };
};