import { FC } from "react";
import { Link } from "react-router-dom";

interface IButtonLinkProps {
  path: string;
  text: string;
}

export const ButtonLink: FC<IButtonLinkProps> = ({ path, text }) => {
  return (
    <button>
      <Link to={path}>{text}</Link>
    </button>
  );
};
