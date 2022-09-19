import { FC } from "react";
import { Button } from "antd";
import { useActions } from "../../../hooks/useActions";
import { useLogoutMutation } from "../../../services/authService";

export const Logout: FC = () => {
  const { logout } = useActions();

  const [fetchLogout] = useLogoutMutation();

  const handleLogout = () => {
    fetchLogout({});
    logout();
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};
