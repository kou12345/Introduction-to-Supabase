import { createClient } from "@supabase/supabase-js";

export type Database = {};

// 環境変数を取得
// supabaseUrlがnull, undefinedではないことをコンパイラに伝える
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// supabaseクライアントを作成
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export default supabase;
