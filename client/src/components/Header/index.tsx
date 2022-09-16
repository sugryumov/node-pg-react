import { FC } from "react";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Logout } from "./Logout";

const defaultMenu = [
  {
    id: 1,
    path: "/login",
    name: "login",
  },
  {
    id: 2,
    path: "/registration",
    name: "registration",
  },
];

const authMenu = [
  {
    id: 1,
    path: "/users",
    name: "users",
  },
];

export const Header: FC = () => {
  const { isAuth } = useTypedSelector((state) => state.authReducer);

  const renderMenu = (items: any) => {
    return items.map((item: any) => {
      return (
        <Link key={item.id} to={item.path} className="menu__item">
          {item.name}
        </Link>
      );
    });
  };

  return (
    <nav>
      {isAuth ? (
        <>
          {renderMenu(authMenu)}
          <Logout />
        </>
      ) : (
        renderMenu(defaultMenu)
      )}
    </nav>
  );
};
