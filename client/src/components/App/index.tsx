import { FC, useEffect } from 'react';
import { Layout } from 'antd';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useCheckAuthQuery } from '@/services/authService';
import { AppRoutes } from '@/components/AppRoutes';
import { AppHeader } from '@/components/AppHeader';
import { AppFooter } from '@/components/AppFooter';
import styles from './index.module.css';

export const App: FC = () => {
  const { setCredentials } = useActions();
  const { isAuth } = useTypedSelector(state => state.authReducer);

  const { data, isSuccess, isFetching } = useCheckAuthQuery(
    {},
    {
      skip: !isAuth,
    },
  );

  useEffect(() => {
    if (isSuccess) {
      setCredentials(data);
    }
  }, [isSuccess]);

  if (isFetching) {
    return <h1>Loading...</h1>;
  }

  const appStyles = `${styles.app} container`;

  return (
    <Layout>
      <AppHeader />
      <div className={appStyles}>
        <AppRoutes />
      </div>
      <AppFooter />
    </Layout>
  );
};
