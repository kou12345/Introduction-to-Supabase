import useAuth from "../hooks/useAuth";

// サインインボタン
const SignInGitHub = () => {
  const { signInWithGitHub, error } = useAuth();

  return (
    <div>
      <button onClick={signInWithGitHub}>GitHubでサインインする</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignInGitHub;
