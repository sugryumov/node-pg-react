import { FC, useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useCheckAuthQuery } from "../../services/authService";
import { AppRoutes } from "../AppRoutes";
import { Header } from "../Header";

export const App: FC = () => {
  const { setCredentials } = useActions();
  const { data, isSuccess, isFetching } = useCheckAuthQuery(
    {},
    {
      skip: !localStorage.getItem("token"),
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
