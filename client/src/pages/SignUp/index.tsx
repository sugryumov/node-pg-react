import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PUBLIC_ROUTES } from "../../constants/routes";
import { useSignUpMutation } from "../../services/authService";

export const SignUp: FC = () => {
  const navigation = useNavigate();

  const [fetchSignUp, { isSuccess }] = useSignUpMutation();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (isSuccess) {
      navigation(PUBLIC_ROUTES.SIGN_IN.PATH);
    }
  }, [isSuccess]);

  const handleSignUp = () => {
    fetchSignUp({ email, password });
  };

  return (
    <div>
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

      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};
