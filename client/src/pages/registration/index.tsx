import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistrationMutation } from "../../services/authService";

export const Registration: FC = () => {
  const navigation = useNavigate();

  const [fetchRegistration, { isSuccess }] = useRegistrationMutation();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (isSuccess) {
      navigation("/login");
    }
  }, [isSuccess]);

  const handleRegistration = () => {
    fetchRegistration({ email, password });
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

      <button onClick={handleRegistration}>Registration</button>
    </div>
  );
};
