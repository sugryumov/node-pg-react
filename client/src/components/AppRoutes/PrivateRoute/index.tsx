import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

interface IPrivateRouteProps {
  component: any;
}

export const PrivateRoute: FC<IPrivateRouteProps> = ({
  component: RouteComponent,
}) => {
  const { isAuth } = useTypedSelector((state) => state.authReducer);

  return isAuth ? RouteComponent : <Navigate to="/login" />;
};
