import { FC } from 'react';
import { PUBLIC_ROUTES } from '@/constants/routes';
import { ButtonLink } from '@/components/ButtonLink';
import styles from './index.module.css';

export const Authorization: FC = () => (
  <div className={styles.authorization}>
    <ButtonLink
      path={PUBLIC_ROUTES.SIGN_IN.PATH}
      text={PUBLIC_ROUTES.SIGN_IN.NAME}
      className={styles.link}
      type="ghost"
    />
    <ButtonLink
      path={PUBLIC_ROUTES.SIGN_UP.PATH}
      text={PUBLIC_ROUTES.SIGN_UP.NAME}
      className={styles.link}
      type="primary"
    />
  </div>
);
