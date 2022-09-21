import { IRoutes } from '@/models/IRoute';
import { Home } from '@/pages/Home';
import { SignIn } from '@/pages/SignIn';
import { NotFound } from '@/pages/NotFound';
import { SignUp } from '@/pages/SignUp';
import { Users } from '@/pages/Users';

export const PUBLIC_ROUTES: IRoutes = {
  HOME: {
    PATH: '/',
    NAME: 'HOME',
    COMPONENT: <Home />,
  },
  SIGN_IN: {
    PATH: '/sign-in',
    NAME: 'Sign In',
    COMPONENT: <SignIn />,
  },
  SIGN_UP: {
    PATH: '/sign-up',
    NAME: 'Sign Up',
    COMPONENT: <SignUp />,
  },

  NOT_FOUND: {
    PATH: '*',
    NAME: 'NOT_FOUND',
    COMPONENT: <NotFound />,
  },
};

export const PRIVATE_ROUTES: IRoutes = {
  GRAMMAR: {
    PATH: '/grammar',
    NAME: 'GRAMMAR',
    COMPONENT: <Users />,
  },
  LISTENING: {
    PATH: '/listening',
    NAME: 'LISTENING',
    COMPONENT: <Users />,
  },
};
