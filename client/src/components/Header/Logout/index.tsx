import { FC } from "react";
import { useActions } from "../../../hooks/useActions";
import { useLogoutMutation } from "../../../services/authService";

export const Logout: FC = () => {
  const { logout } = useActions();

  const [fetchLogout] = useLogoutMutation();

  const handleLogout = () => {
    fetchLogout({});
    logout();
  };

  return <button onClick={handleLogout}>Logout</button>;
};
