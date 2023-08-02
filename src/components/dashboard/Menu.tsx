import React from 'react';
import {
  SettingOutlined,
  ShopOutlined,
  UserOutlined,
  DashboardOutlined,
  LoginOutlined 
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

type MenuItem = {
  key: string; // Adaugă tipul pentru cheie aici
  icon?: React.ReactNode;
  children?: MenuItem[];
  label: React.ReactNode;
  type?: 'group';
};

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Dashboard', '/dashboard', <DashboardOutlined />),
  getItem('Stores', '/stores', <ShopOutlined />),
  getItem('Users', '/users', <UserOutlined />),
  getItem('Settings', '/settings', <SettingOutlined />),
  getItem('Log In', '/login',<LoginOutlined />),

];




const MenuComponent: React.FC = () => {

  const navigate = useNavigate();

  const handleMenuClick = ({ key }: { key: React.Key }) => {
    if (key) {
      navigate(String(key));
    }
  };

  return (
 
        <Menu
          defaultSelectedKeys={['key']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          items={items}
          onClick={handleMenuClick}
        />
  );
};

export default MenuComponent;