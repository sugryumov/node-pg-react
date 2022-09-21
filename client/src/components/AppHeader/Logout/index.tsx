import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { useActions } from '@/hooks/useActions';
import { useLogoutMutation } from '@/services/authService';
import { PUBLIC_ROUTES } from '@/constants/routes';
import styles from './index.module.css';

export const Logout: FC = () => {
  const navigation = useNavigate();
  const { logout } = useActions();

  const [fetchLogout] = useLogoutMutation();

  const handleLogout = () => {
    fetchLogout({});
    logout();
    navigation(PUBLIC_ROUTES.HOME.PATH);
  };

  return (
    <Button onClick={handleLogout} className={styles.button}>
      LOG OUT
    </Button>
  );
};
