import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import type { ButtonType } from 'antd/lib/button';
import styles from './index.module.css';

interface IButtonLinkProps {
  path: string;
  text: string;
  className?: string;
  type?: ButtonType;
}

export const ButtonLink: FC<IButtonLinkProps> = ({
  path,
  text,
  className,
  type = 'default',
}) => (
  <Button type={type} className={className}>
    <Link to={path} className={styles.link}>
      {text}
    </Link>
  </Button>
);
