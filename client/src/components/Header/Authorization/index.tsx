import { FC } from "react";
import { PUBLIC_ROUTES } from "../../../constants/routes";
import { ButtonLink } from "../../ButtonLink";
import styles from "./index.module.css";

export const Authorization: FC = () => (
  <div className={styles.authorization}>
    <ButtonLink
      path={PUBLIC_ROUTES.LOGIN.PATH}
      text={PUBLIC_ROUTES.LOGIN.NAME}
    />
    <ButtonLink
      path={PUBLIC_ROUTES.REGISTRATION.PATH}
      text={PUBLIC_ROUTES.REGISTRATION.NAME}
    />
  </div>
);
