import React, { useState } from 'react';
import humansImage from 'src/assets/images/humans.png';
// import AppLogo from 'src/assets/images/appLogo.svg';

import {
  SettingOutlined,
  ShopOutlined,
  UserOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FileDoneOutlined
} from '@ant-design/icons';
import { Menu, Layout, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loggedOut } from 'src/features/authentication/authenticationSlice';
import { ROUTES } from 'src/utils/Constants';
import { AppLogo } from '../Icons/Icons';

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
  getItem('Invoices', ROUTES.Invoices, <FileDoneOutlined />),
  getItem('Users', '/users', <UserOutlined />),
  getItem('Settings', '/settings', <SettingOutlined />),
  getItem('Log Out', '/login', <LogoutOutlined />),
];


const MenuComponent: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleMenuClick = ({ key }: { key: React.Key }) => {

    // logout
    if (key == "/login") {
      dispatch(loggedOut(null));
    }

    if (key) {
      navigate(String(key));
    }
  };

  return (
    <Layout className='z-50 '>
        <Sider trigger={null} collapsible collapsed={collapsed} className='h-full relative w-auto'>
          <div className=' w-inherit'>
              <Header className={`bg-transparent p-0 flex ${collapsed && "flex-col"}  justify-between items-center sm:mb-32`}>
                <div className='pt-4 pl-4'>
                  {/* <img 
                    src={AppLogo}
                  /> */}
                  <div className={`${collapsed ? '-scale-[50%] -translate-x-2' : ''}`}>
                    <AppLogo width={50} height={50}/>
                  </div>
                </div>
                <Button
                  type="text"
                  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  onClick={() => setCollapsed(!collapsed)}
                  className={`text-xl w-166 h-16 text-white ${collapsed ? '-order-1': ''}`}
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
