import { FC, useEffect, useState } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import {
  useLoginMutation,
  useLogoutMutation,
} from "../../services/authService";

export const Login: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [fetchLogin, { data, error, isError, isSuccess }] = useLoginMutation();

  const { setCredentials } = useActions();
  const { isAuth, profile } = useTypedSelector((state) => state.authReducer);

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

  const handleLogin = () => {
    fetchLogin({ email, password });
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

        <button onClick={handleLogin}>Login</button>
      </>
    );
  }

  return <div>Пользователь с email {profile.email} авторизован</div>;
};
