import { PRIVATE_ROUTES } from "./routes";

export interface INavigation {
  PATH: string;
  NAME: string;
}

export const NAVIGATION: INavigation[] = [
  {
    PATH: PRIVATE_ROUTES.GRAMMAR.PATH,
    NAME: PRIVATE_ROUTES.GRAMMAR.NAME,
  },
  {
    PATH: PRIVATE_ROUTES.LISTENING.PATH,
    NAME: PRIVATE_ROUTES.LISTENING.NAME,
  },
];
