import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import type { MenuProps } from 'antd/es/menu';
import { MENU } from '@/constants/menu';

type MenuItem = Required<MenuProps>['items'][number];

export const AppMenu: FC = () => {
  const { pathname } = useLocation();

  const items: MenuItem[] = MENU.map(({ label, items }) => ({
    key: label,
    label,
    children: items.map(el => ({
      key: el.path,
      label: (
        <Link key={el.path} to={el.path}>
          {el.label}
        </Link>
      ),
    })),
  }));

  return (
    <Menu
      mode="horizontal"
      theme="dark"
      triggerSubMenuAction="click"
      items={items}
      selectedKeys={[pathname]}
    />
  );
};
