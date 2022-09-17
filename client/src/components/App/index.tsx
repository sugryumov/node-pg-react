import { FC, useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useCheckAuthQuery } from "../../services/authService";
import { AppRoutes } from "../AppRoutes";
import { Header } from "../Header";

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
    <>
      <Header />
      <AppRoutes />
    </>
  );
};
