import { FC } from "react";
import { useActions } from "../../hooks/useActions";
import { useLogoutMutation } from "../../services/authService";

export const Logout: FC = () => {
  const [fetchLogout] = useLogoutMutation();

  const { logout } = useActions();

  const handleLogout = () => {
    fetchLogout({});
    logout();
  };

  return <button onClick={handleLogout}>Выйти</button>;
};
