import { useState } from 'react';
import { Tabs, TabsProps, Typography, theme } from 'antd';
import { Breadcrumb, Card, Layout } from 'src/components/_shared';
import ComingSoonSvg from "src/assets/images/git.svg";
import Roles from './Roles';
import Language from './Language';
import CompanySettings from './CompanySettings';
import Notifications from './Notifications';


// const ComingSoon = () => {
//     return (
//         <div className="w-full h-full flex flex-col justify-center items-center">
//             <img src={ComingSoonSvg} width={450} height={250} />
//             <p className="font-semibold text-3xl mt-3">Coming Soon</p>
//             <p className="text-xl font-semibold mt-2">
//                 This product is currently in development, but be sure to check back for updates!
//             </p>
//         </div>
//     );
// };

const Title = Typography.Title;

const { TabPane } = Tabs;

const SELECTED_CLASS = 'bg-gray-200 rounded-3xl';

const { useToken } = theme;


export default function Settings() {
    const [selectedTab, setSelectedTab] = useState<string>('0');  // default = Company


    const items: TabsProps['items'] = [
        {
            key: '0',
            label: (
                <div className={`w-full px-2 py-1 text-black hover:bg-gray-100 hover:rounded-3xl cursor-pointer ${selectedTab === '0' ? SELECTED_CLASS : ''}`}>
                    Company Settings
                </div>
            ),
            children: <CompanySettings />
        },
        {
            key: '1',
            label: (
                <div className={`w-full px-2 py-1 text-black hover:bg-gray-100 hover:rounded-3xl cursor-pointer ${selectedTab === '1' ? SELECTED_CLASS : ''}`}>
                    Roles & Permissions
                </div>
            ),
            children: <Roles />
        },
        {
            key: '2',
            label: (
                <div className={`w-full px-2 py-1 text-black hover:bg-gray-100 hover:rounded-3xl cursor-pointer ${selectedTab === '2' ? SELECTED_CLASS : ''}`}>
                    Language preferences
                </div>
            ),
            children: <Language />
        },
        {
            key: '3',
            label: (
                <div className={`w-full px-2 py-1 text-black hover:bg-gray-100 hover:rounded-3xl cursor-pointer ${selectedTab === '3' ? SELECTED_CLASS : ''}`}>
                    Notifications
                </div>
            ),
            children: <Notifications />
        },
    ];
    const { token } = useToken();

    return (
        <Layout>
            <div className="w-full flex justify-between items-start">
                <div className="flex items-center">
                    <Title level={2}>Settings</Title>
                    <Breadcrumb
                        items={[
                            {
                                title: "Settings"
                            }
                        ]}
                    />
                </div>
            </div>
            <Card className="mt-5 w-full h-full !px-0">
                <Tabs
                    className='h-full'
                    tabPosition='left'
                    size='large'
                    defaultActiveKey={selectedTab}
                    items={items}
                    onChange={(index) => setSelectedTab(index)}
                />
            </Card>
        </Layout>
    );
}
