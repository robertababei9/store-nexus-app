import React, { useMemo, useState, useEffect } from 'react';
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
import { IoMdAdd } from "react-icons/io";
import { Menu, Layout, Button, Avatar, Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { loggedOut } from 'src/features/authentication/authenticationSlice';
import { ROUTES } from 'src/utils/Constants';
import { AppLogo } from '../Icons/Icons';
import { PERMISSIONS, getPathsFromRolePermissions } from 'src/utils/Permissions';
import CompanyMenuItem from './CompanyMenuItem';
import { ApiResponseModel } from 'src/types/_shared';
import axios from 'axios';
import { getDefaultApiUrl } from 'src/config';
import { CompanyInfoType } from 'src/types/company';

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



const MenuComponent: React.FC = () => {
  // navigation
  const navigate = useNavigate();
  const { rolePermissions } = useSelector(
    (state: RootState) => state.authentication
  )

  // redux
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state: RootState) => state.authentication
  )

  // states
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [companyData, setCompanyData] = useState<CompanyInfoType | null>(null);
  const [companyDataLoading, setCompanyDataLoading] = useState<boolean>(true);

  // effects
  useEffect(() => {
    // console.log("--------------- MENU rendering from useEffect ------------------");
    
    if (currentUser?.CompanyId) {
      const { CompanyId } = currentUser;  // get the companyId from user <- token
      fetchCompanyInfo(CompanyId);
    }

  }, [currentUser?.CompanyId]);

  // handlers
  const handleMenuClick = ({ key }: { key: React.Key }) => {

    // logout
    if (key === "/login") {
      dispatch(loggedOut(null)); // logout
    }

    if (key) {
      navigate(String(key));
    }
  };

  // helpers
  const fetchCompanyInfo = async (companyId: string) => {
    try {
        const result = await axios.get<ApiResponseModel>(getDefaultApiUrl() + `/api/company/GetById/${companyId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        });

        // console.log("MENU -> fetchCompanyInfo ---> result.data = ", result.data);
        if (result.status === 200) {
          const { Data, Success } = result.data;
          if (Success) {
            setCompanyData(Data);
          }
        }

    }
    catch(error: any) {
      setCompanyDataLoading(false);
    }
    finally {
      setCompanyDataLoading(false);
    }

  }

  const getMenuItems = useMemo(() => {
    const items: MenuItem[] = [];

    if (getPathsFromRolePermissions(rolePermissions).includes(ROUTES.Dashboard)) {
      items.push(
        getItem('Dashboard', ROUTES.Dashboard, <HomeOutlined />)
      )
    }
    if (getPathsFromRolePermissions(rolePermissions).includes(ROUTES.Stores)) {
      items.push(
        getItem('Stores', ROUTES.Stores, <ShopOutlined />),
      )
    }
    if (getPathsFromRolePermissions(rolePermissions).includes(ROUTES.Invoices)) {
      items.push(
        getItem('Invoices', ROUTES.Invoices, <FileDoneOutlined />)
      )
    }
    if (getPathsFromRolePermissions(rolePermissions).includes(ROUTES.Users)) {
      items.push(
        getItem('Users', ROUTES.Users, <UserOutlined />)
      )
    }
    if (getPathsFromRolePermissions(rolePermissions).includes(ROUTES.Settings)) {
      items.push(
        getItem('Settings', ROUTES.Settings, <SettingOutlined />)
      )
    }

    items.push(getItem('Log Out', ROUTES.SignIn, <LogoutOutlined />))

    return items;
    
  }, [rolePermissions]);


  return (
    <Layout className='z-50 '>
        <Sider trigger={null} collapsible collapsed={collapsed} className='h-full relative w-auto'>
          <div className=' w-inherit'>
              <Header className={`bg-transparent p-0 flex ${collapsed && "flex-col"}  justify-between items-center sm:mb-20`}>
                <div className='pt-4 pl-4'>
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

              <CompanyMenuItem 
                collapsed={collapsed} 
                companyData={companyData}
                loading={companyDataLoading}
                // loading={true}
              />

              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['/dashboard']}
                defaultOpenKeys={['/dashboard']}
                items={getMenuItems}
                onClick={handleMenuClick}
                className='bg-rgb-28-37-54'
              />
          </div>
        </Sider>
    </Layout>
  );
};

export default MenuComponent;
