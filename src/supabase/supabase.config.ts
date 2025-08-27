import { createClient } from "@supabase/supabase-js";

// クライアントサイド用のSupabaseクライアント
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // Anon Keyを使用
);

// サーバーサイド用のSupabaseクライアント（Server Actions用）
export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
