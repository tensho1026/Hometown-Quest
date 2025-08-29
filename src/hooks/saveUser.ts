// saveUser.ts は saveUser.tsx に変更し、コンポーネントとして扱う
'use client';

import { saveUserToDatabase } from "@/app/actions/auth/saveUser";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

// 関数をコンポーネントとして定義する
export const SaveUser = () => {
  const { user } = useUser();

  useEffect(() => {
    // ユーザー情報がない場合は何もしない
    if (!user?.id) return;

    // 非同期関数をuseEffect内で実行する
    const saveUserData = async () => {
      await saveUserToDatabase({
        id: user.id,
        username: user.fullName,
        imageUrl: user.imageUrl,
      });
    };

    saveUserData();
  }, [user]);

  // コンポーネントとして何も表示しない場合は null を返す
  return null;
};