import { useState, useEffect } from "react";
import { Typography } from "antd";
import { useParams } from "react-router-dom";
import {
  Breadcrumb,
  Button,
  Card,
  Layout,
  LoadingWrapper,
} from "src/components/_shared";
import { ROUTES } from "src/utils/Constants";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import BasicInfo from "src/components/edit-store/BasicInfo";
import { CreateStoreFormType, StoreDataType } from "src/types/store";

import ComingSoonSvg from "src/assets/images/git.svg";
import { useForm } from "react-hook-form";
import { getDefaultApiUrl } from "src/config";
import axios from "axios";
import { ApiResponseModel } from "src/types/_shared";
import { openNotification } from "src/utils/Notification";

const ComingSoon = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <img src={ComingSoonSvg} width={450} height={250} />
      <p className="font-semibold text-3xl mt-3">Coming Soon</p>
      <p className="text-xl font-semibold mt-2">
        This product it's currently in development, but be sure to check back
        for updates !
      </p>
    </div>
  );
};

const Title = Typography.Title;

export default function EditStore() {
  const params = useParams();

  // form
  const methods = useForm<CreateStoreFormType>({
    defaultValues: {
      Id: "",
      Name: "",
      Description: "",
      Contact: "",
      Location: "",
      LatLng: "52.5200 13.4050",
      ManagerId: "",
      StoreStatusId: "",
      WorkingHours: "08:00 - 22:00",
    },
  });

  methods.watch("Name");
  methods.watch("Description");

  // states
  const [storeDataLoading, setStoreDataLoading] = useState<boolean>(true);
  const [editStoreLoading, setEditStoreLoading] = useState<boolean>(false);

  // effects
  useEffect(() => {
    if (params.id) {
      fetchStoreById(params.id);
    }
  }, []);

  // handlers
  const handleEditStore = async () => {
    const isValid = methods.trigger();
    if (!isValid) {
      return;
    }

    console.log("Store -> Edit -> formValues = ", methods.getValues());

    try {
      setEditStoreLoading(true);
      const BASE_URL = getDefaultApiUrl();
      const result = await axios.put<ApiResponseModel>(
        `${BASE_URL}/api/stores/Edit/${params.id}`,
        methods.getValues(),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (result.data) {
        const { Data, Success, Errors } = result.data;
        console.log("Store -> Edit -> DATA = ", Data);

        if (Success) {
          openNotification("success", "Success", "Store successfully updated");
        }
        else {
          Errors.forEach(errorMessage => {
            openNotification("warning", "Error", errorMessage);
          });
        }

      }
    } catch (error: any) {
      console.log(`Error updating the store data for ${params.id}: ${error}`);
      openNotification("error", "Error", "Error updating the store");
    } finally {
      setEditStoreLoading(false);
    }
  };

  // helpers
  const fetchStoreById = async (id: string) => {
    try {
      const BASE_URL = getDefaultApiUrl();
      const result = await axios.get<ApiResponseModel>(
        `${BASE_URL}/api/stores/GetById/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (result.data) {
        const { Data } = result.data;
        console.log("DATA = ", Data);
        methods.reset(Data);
      }
    } catch (error: any) {
      console.log(
        `Error while geting the store data for ${params.id}: ${error}`
      );
      openNotification("error", "Error", "Error while getting the store");
    } finally {
      setStoreDataLoading(false);
    }
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Basic info`,
      children: (
        <div className="w-full px-3">
          <LoadingWrapper loading={storeDataLoading}>
            <BasicInfo methods={methods} />
          </LoadingWrapper>
        </div>
      ),
    },
    {
      key: "2",
      label: `Files and Documents`,
      children: <ComingSoon />,
    },
    {
      key: "3",
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
              title: "Stores",
            },
            {
              title: "Edit",
            },
          ]}
        />
      </div>

      <div className="w-full h-[100px] flex justify-between items-center  mt-6 mb-4">
        <div className="w-full h-full flex justify-start items-center">
          <img
            width={75}
            height={55}
            src={require("src/assets/images/humans.png")}
          />
          <div className="ml-3 w-full flex flex-col justify-center items-start font-semibold">
            <p className="text-2xl">{methods.getValues("Name")}</p>
            <p className="text-sm text-gray-400">
              {methods.getValues("Description")}
            </p>
          </div>
        </div>

        <Button
          className="w-[80px]"
          loading={editStoreLoading}
          disabled={editStoreLoading}
          onClick={handleEditStore}
        >
          Save
        </Button>
      </div>

      <Card className="w-full h-full !px-0">
        <Tabs
          tabBarStyle={{ paddingLeft: 18 }}
          size="large"
          defaultActiveKey="1"
          items={items}
          onChange={() => {}}
        />
      </Card>
    </Layout>
  );
}
