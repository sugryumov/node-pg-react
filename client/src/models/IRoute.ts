import { ReactElement } from 'react';

export interface IRoute {
  PATH: string;
  NAME: string;
  COMPONENT: ReactElement;
}

export type IRoutes = {
  [key: string]: IRoute;
};
