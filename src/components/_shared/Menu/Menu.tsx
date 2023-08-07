import React, { useState } from 'react';
import humansImage from 'src/assets/images/humans.png';

import {
  SettingOutlined,
  ShopOutlined,
  UserOutlined,
  HomeOutlined,
  LogoutOutlined,
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
  getItem('Dashboard', '/dashboard', <HomeOutlined />),
  getItem('Stores', '/stores', <ShopOutlined />),
  getItem('Users', '/users', <UserOutlined />),
  getItem('Settings', '/settings', <SettingOutlined />),
  getItem('Log Out', '/login', <LogoutOutlined />),
];


const MenuComponent: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const handleMenuClick = ({ key }: { key: React.Key }) => {

    // logout
    if (key == "/login") {
      localStorage.removeItem("accessToken");
    }

    if (key) {
      navigate(String(key));
    }
  };

  return (
    <Layout className='z-50 '>
        <Sider trigger={null} collapsible collapsed={collapsed} className='h-full relative w-auto'>
          <div className=' w-inherit'>
              <Header className="bg-transparent p-0 flex justify-between items-center">
                <div className='w-[40%]'>
                  <img
                    src={humansImage}
                    alt="Humans image"
                  />
                </div>
                <Button
                  type="text"
                  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  onClick={() => setCollapsed(!collapsed)}
                  className={`text-xl w-166 h-16 text-white`}
                  style={{color: "white"}}
                />
              </Header>
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['/dashboard']}
                defaultOpenKeys={['/dashboard']}
                items={items}
                onClick={handleMenuClick}
                className='bg-rgb-28-37-54'
              />
          </div>
        </Sider>
    </Layout>
  );
};

export default MenuComponent;
