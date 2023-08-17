import { useState } from 'react';
import {  Typography } from "antd";
import {  useParams } from "react-router-dom";
import { Breadcrumb, Button, Card, Layout } from "src/components/_shared";
import { ROUTES } from "src/utils/Constants";
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import BasicInfo from 'src/components/edit-store/BasicInfo';
import { StoreDataType } from 'src/types/store';

import ComingSoonSvg from 'src/assets/images/git.svg'

const ComingSoon = () => {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <img src={ComingSoonSvg} width={450} height={250}/>
      <p className='font-semibold text-3xl mt-3'>Coming Soon</p>
      <p className='text-xl font-semibold mt-2'>This product it's currently in development, but be sure to check back for updates !</p>
    </div>
  )
}

const INITIAL_STORE_DATA: StoreDataType = {
  name: "My store name",
  description: "Some small details about the store. Could be anything",
}

const Title = Typography.Title;

export default function EditStore() {

    // states
    const [storeData, setStoreData] = useState<StoreDataType>(INITIAL_STORE_DATA)

    const params = useParams();


    const items: TabsProps['items'] = [
      {
        key: '1',
        label: `Basic info`,
        children: <BasicInfo data={storeData}/>,
      },
      {
        key: '2',
        label: `Files and Documents`,
        children: <ComingSoon />,
      },
      {
        key: '3',
        label: `Inventory`,
        children: <ComingSoon />,
      },
    ];

    return (
      <Layout>
          <div className="flex items-center">
              <Title level={2}>Edit Store</Title>
              <Breadcrumb
                items={[
                  {
                    path: ROUTES.Stores,
                    title: "Stores"
                  },
                  {
                    title: params.id == '0' ? "Add" : "Edit",
                  }
                ]}
              />
          </div>

          <div className="w-full h-[100px] flex justify-between items-center  mt-6 mb-4">

              <div className="w-full h-full flex justify-start items-center">
                  <img width={75} height={55} src={require("src/assets/images/humans.png")}/>
                  <div className="ml-3 w-full flex flex-col justify-center items-start font-semibold">
                    <p className="text-2xl">{storeData.name}</p>
                    <p className="text-sm text-gray-400">{storeData.description}</p>
                  </div>
              </div>

              <Button className="w-[80px]">Save</Button>

          </div>

          <Card className="w-full h-full !px-0">

              <Tabs
                tabBarStyle={{paddingLeft: 18}}
                size='large'
                defaultActiveKey="1" 
                items={items} 
                onChange={() => {}} 
              />

          </Card>
      </Layout>
    )
}
