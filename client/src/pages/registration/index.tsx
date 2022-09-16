import React, { FC, useState } from "react";
import { useRegistrationMutation } from "../../services/authService";

export const Registration: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [fetchRegistration] = useRegistrationMutation();

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
