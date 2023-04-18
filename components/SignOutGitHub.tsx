import useAuth from "../hooks/useAuth";

// サインアウトボタン
const signOutGitHub = () => {
  const { signOut } = useAuth();
  return <button onClick={signOut}>サインアウト</button>;
};

export default signOutGitHub;
