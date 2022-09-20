import { FC, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useSignInMutation } from "../../services/authService";

export const SignIn: FC = () => {
  const { setCredentials } = useActions();
  const { isAuth } = useTypedSelector((state) => state.authReducer);

  const [fetchSignIn, { data, error, isError, isSuccess }] =
    useSignInMutation();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (isSuccess) {
      setCredentials(data);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      const errorMessage: any = error;

      console.log("error", errorMessage?.data?.message);
    }
  }, [isError]);

  const handleSignIn = () => {
    fetchSignIn({ email, password });
  };

  if (!isAuth) {
    return (
      <>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />

        <button onClick={handleSignIn}>Sign In</button>
      </>
    );
  }

  return <Navigate to="/" />;
};
