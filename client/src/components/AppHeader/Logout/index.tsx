import { FC } from "react";
import { Button } from "antd";
import { useActions } from "../../../hooks/useActions";
import { useLogoutMutation } from "../../../services/authService";
import styles from "./index.module.css";

export const Logout: FC = () => {
  const { logout } = useActions();

  const [fetchLogout] = useLogoutMutation();

  const handleLogout = () => {
    fetchLogout({});
    logout();
  };

  return (
    <Button onClick={handleLogout} className={styles.button}>
      LOG OUT
    </Button>
  );
};
