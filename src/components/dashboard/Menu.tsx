import React, { useState } from 'react';
import humansImage from '../../assets/images/humans.png';

import {
  SettingOutlined,
  ShopOutlined,
  UserOutlined,
  DashboardOutlined,
  LoginOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import { Menu, Layout, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header, Sider } = Layout;

type MenuItem = {
  key: string;
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
  getItem('Log In', '/login', <LoginOutlined />),
];

const MenuComponent: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const handleMenuClick = ({ key }: { key: React.Key }) => {
    if (key) {
      navigate(String(key));
    }
  };

  return (
    <Layout className='z-50 w-[230px]'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {/* Modificarea: Adăugăm un antet pentru imagine și buton */}
        <Header className="bg-transparent p-0 flex justify-between items-center">
          {/* Modificarea: Adăugăm imaginea */}
          <div className='w-[40%]'>
            <img
              src={humansImage}
              alt="Humans image"
            />
          </div>
          {/* Modificarea: Stilizăm butonul cu culoarea textului și a fundalului */}
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className={`text-xl w-166 h-16 text-white`} 
            //AICI E PROBLEMA! mereu cand dau hover pe buton i se schimba in negru sau bckgrnd (am stat cv timp sa rezolv si nimic,bft)
          />
        </Header>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/dashboard']}
          defaultOpenKeys={['/dashboard']}
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
    </Layout>
  );
};

export default MenuComponent;
