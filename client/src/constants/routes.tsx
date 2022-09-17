import { IRoutes } from "../models/IRoute";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { NotFound } from "../pages/notFound";
import { Registration } from "../pages/registration";
import { Users } from "../pages/users";

export const PUBLIC_ROUTES: IRoutes = {
  HOME: {
    PATH: "/",
    NAME: "HOME",
    COMPONENT: <Home />,
  },
  LOGIN: {
    PATH: "/login",
    NAME: "LOGIN",
    COMPONENT: <Login />,
  },
  REGISTRATION: {
    PATH: "/registration",
    NAME: "REGISTRATION",
    COMPONENT: <Registration />,
  },

  NOT_FOUND: {
    PATH: "*",
    NAME: "NOT_FOUND",
    COMPONENT: <NotFound />,
  },
};

export const PRIVATE_ROUTES: IRoutes = {
  GRAMMAR: {
    PATH: "/grammar",
    NAME: "GRAMMAR",
    COMPONENT: <Users />,
  },
  LISTENING: {
    PATH: "/listening",
    NAME: "LISTENING",
    COMPONENT: <Users />,
  },
};
