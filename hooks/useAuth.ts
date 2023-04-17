import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import supabase from "../lib/supabase";

const useAuth = () => {
  // ログイン状態を管理
  const [session, setSession] = useState<Session | null>(null);
  // エラーを管理
  const [error, setError] = useState("");

  useEffect(() => {
    // ログイン状態を監視
    // q: 何をしているのか？
    // a: onAuthStateChangeは、ログイン状態が変化したときに呼び出される
    // 今回は、ログイン状態が変化したときに、setSessionを呼び出している
    // つまり、ログイン状態が変化したときに、sessionの値が変化する
    // そのため、sessionの値が変化すると、useEffectが呼び出される
    // つまり、ログイン状態が変化したときに、useEffectが呼び出される
    // つまり、ログイン状態が変化したときに、このコンポーネントが再レンダリングされる
    const { data: authData } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });

    // リスナーの解除
    // q: 何をしているのか？
    // a: useEffectの返り値に関数を指定すると、コンポーネントがアンマウントされるときに実行される
    // 今回は、onAuthStateChangeのリスナーを解除するために使っている
    return () => {
      authData.subscription.unsubscribe();
    };
  }, []);

  // GitHubでサインイン
  const signInWithGitHub = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
      });
      if (error) {
        setError(error.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else if (typeof error === "string") {
        setError(error);
      } else {
        console.error("GitHubとの連携に失敗しました");
      }
    }
  };

  // ログインユーザーのプロフィールを取得
  const profileFromGithub: {
    nickName: string;
    avatarUrl: string;
  } = {
    nickName: session?.user?.user_metadata.user_name,
    avatarUrl: session?.user?.user_metadata.avatar_url,
  };

  // サインアウト
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return {
    session,
    error,
    profileFromGithub,
    signInWithGitHub,
    signOut,
  };
};

export default useAuth;
