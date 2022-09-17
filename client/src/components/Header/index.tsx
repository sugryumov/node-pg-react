import { FC } from "react";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { PUBLIC_ROUTES } from "../../constants/routes";
import { Logout } from "./Logout";
import { Navigation } from "./Navigation";
import { Authorization } from "./Authorization";
import styles from "./index.module.css";

export const Header: FC = () => {
  const { isAuth } = useTypedSelector((state) => state.authReducer);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to={PUBLIC_ROUTES.HOME.PATH}>English exercises</Link>
      </div>

      {isAuth ? (
        <>
          <Navigation />
          <Logout />
        </>
      ) : (
        <>
          <div />
          <Authorization />
        </>
      )}
    </header>
  );
};
