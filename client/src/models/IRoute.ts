import { ReactElement } from 'react';

export interface IRoute {
  PATH: string;
  COMPONENT: ReactElement;
  NAME?: string;
}

export type IRoutes = {
  [key: string]: IRoute;
};
