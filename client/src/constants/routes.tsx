import { IRoutes } from '@/models/IRoute';
import { Home } from '@/pages/Home';
import { SignIn } from '@/pages/Auth/SignIn';
import { SignUp } from '@/pages/Auth/SignUp';
import { ResetPassword } from '@/pages/Auth/ResetPassword';
import { NewPassword } from '@/pages/Auth/NewPassword';
import { NotFound } from '@/pages/NotFound';
import { Users } from '@/pages/Users';
import { ExerciseList } from '@/pages/ExerciseList';

export const PUBLIC_ROUTES: IRoutes = {
  HOME: {
    PATH: '/',
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
  NEW_PASSWORD: {
    PATH: '/new-password',
    NAME: 'New password',
    COMPONENT: <NewPassword />,
  },

  NOT_FOUND: {
    PATH: '*',
    COMPONENT: <NotFound />,
  },
};

export const PRIVATE_ROUTES: IRoutes = {
  GRAMMAR: {
    PATH: '/grammar',
    NAME: 'GRAMMAR',
    COMPONENT: <Users />,
  },
  GRAMMAR_EXERCISE_LIST: {
    PATH: '/grammar/:level',
    COMPONENT: <ExerciseList />,
  },
  LISTENING: {
    PATH: '/listening',
    NAME: 'LISTENING',
    COMPONENT: <Users />,
  },
  LISTENING_EXERCISE_LIST: {
    PATH: '/listening/:level',
    COMPONENT: <ExerciseList />,
  },
  READING: {
    PATH: '/reading',
    NAME: 'READING',
    COMPONENT: <Users />,
  },
  READING_EXERCISE_LIST: {
    PATH: '/READING/:level',
    COMPONENT: <ExerciseList />,
  },
};
