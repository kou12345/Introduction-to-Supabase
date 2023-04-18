import useAuth from "../hooks/useAuth";

// サインアウトボタン
const SignOutGitHub = () => {
  const { signOut } = useAuth();
  return <button onClick={signOut}>サインアウト</button>;
};

export default SignOutGitHub;
