import { ENGLISH_LEVEL } from './level';
import { PRIVATE_ROUTES } from './routes';

export const MENU = [
  {
    label: PRIVATE_ROUTES.GRAMMAR.NAME,
    items: [
      {
        key: 'A1',
        label: ENGLISH_LEVEL.A1,
        path: `${PRIVATE_ROUTES.GRAMMAR.PATH}/a1`,
      },
      {
        label: ENGLISH_LEVEL.A2,
        path: `${PRIVATE_ROUTES.GRAMMAR.PATH}/a2`,
      },
    ],
  },
  {
    label: PRIVATE_ROUTES.LISTENING.NAME,
    items: [
      {
        label: ENGLISH_LEVEL.A1,
        path: `${PRIVATE_ROUTES.LISTENING.PATH}/a1`,
      },
      {
        label: ENGLISH_LEVEL.A2,
        path: `${PRIVATE_ROUTES.LISTENING.PATH}/a2`,
      },
    ],
  },
];
