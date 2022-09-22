import { IRoutes } from '@/models/IRoute';
import { Home } from '@/pages/Home';
import { SignIn } from '@/pages/Auth/SignIn';
import { SignUp } from '@/pages/Auth/SignUp';
import { ResetPassword } from '@/pages/Auth/ResetPassword';
import { NotFound } from '@/pages/NotFound';
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
  RESET_PASSWORD: {
    PATH: '/reset-password',
    NAME: 'Reset password',
    COMPONENT: <ResetPassword />,
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
