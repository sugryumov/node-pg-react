import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { PUBLIC_ROUTES } from '@/constants/routes';
import { Logout } from './Logout';
import { Navigation } from './Navigation';
import { Authorization } from './Authorization';
import styles from './index.module.css';

const { Header } = Layout;

export const AppHeader: FC = () => {
  const { isAuth } = useTypedSelector(state => state.authReducer);

  const classHeader = `${styles.header} container`;

  return (
    <Header>
      <div className={classHeader}>
        <div className={styles.logo}>
          <Link to={PUBLIC_ROUTES.HOME.PATH} className={styles.link}>
            English exercise
          </Link>
        </div>

        {isAuth ? (
          <>
            <Navigation />
            <Logout />
          </>
        ) : (
          <>
            <div />
            <Authorization />
          </>
        )}
      </div>
    </Header>
  );
};
