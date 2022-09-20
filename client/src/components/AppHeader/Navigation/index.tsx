import { FC } from "react";
import { NavLink } from "react-router-dom";
import { NAVIGATION } from "../../../constants/navigation";
import styles from "./index.module.css";

export const Navigation: FC = () => (
  <ul className={styles.navigation}>
    {NAVIGATION.map(({ PATH, NAME }) => (
      <li key={PATH} className={styles.item}>
        <NavLink
          to={PATH}
          className={({ isActive }) => (isActive ? styles.linkActive : "")}
        >
          {NAME}
        </NavLink>
      </li>
    ))}
  </ul>
);
