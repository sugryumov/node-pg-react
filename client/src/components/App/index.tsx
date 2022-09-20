import { FC, useEffect } from "react";
import { Layout } from "antd";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useCheckAuthQuery } from "../../services/authService";
import { AppRoutes } from "../AppRoutes";
import { AppHeader } from "../AppHeader";
import { AppFooter } from "../AppFooter";
import styles from "./index.module.css";

export const App: FC = () => {
  const { setCredentials } = useActions();
  const { isAuth } = useTypedSelector((state) => state.authReducer);

  const { data, isSuccess, isFetching } = useCheckAuthQuery(
    {},
    {
      skip: !isAuth,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      setCredentials(data);
    }
  }, [isSuccess]);

  if (isFetching) {
    return <h1>Loading...</h1>;
  }

  return (
    <Layout>
      <AppHeader />
      <div className={styles.app}>
        <AppRoutes />
      </div>
      <AppFooter />
    </Layout>
  );
};
