import { useState } from "react";
import { Typography } from "antd";
import { useForm } from "react-hook-form";
import { Breadcrumb, Button, Card, Layout } from "src/components/_shared";
import { UserFormType } from "src/types/users";
import { ROUTES } from "src/utils/Constants";
import axios from "axios";
import { getDefaultApiUrl } from "src/config";
import { openNotification } from "src/utils/Notification";
import { Link, useNavigate } from "react-router-dom";
import BasicInfo from "src/components/stores/edit/BasicInfo";
import { CreateStoreFormType } from "src/types/store";
import { ApiResponseModel } from "src/types/_shared";
import { BsArrowLeftShort } from "react-icons/bs";

const Title = Typography.Title;

export default function AddUser() {
  // navigation
  const navigate = useNavigate();

  // form
  const methods = useForm<CreateStoreFormType>({
    defaultValues: {
      Id: null,
      Name: "",
      Description: "",
      Contact: "",
      ManagerId: "",
      StoreStatusId: "",
      WorkingHours: "08:00 - 22:00",
      Country: "",
      CountryCode: "",
      Location: "",
      LatLng: "52.5200 13.4050",
    },
  });

  methods.watch("Name");
  methods.watch("Description");

  // handlers
  const handleCreateStore = async () => {
    const isValid = await methods.trigger();
    const formValues = methods.getValues();
    console.log("formValues = ", formValues);

    if (!isValid) {
      return;
    }

    try {
      const result = await axios.post<ApiResponseModel>(
        getDefaultApiUrl() + "/api/stores/CreateStore",
        formValues,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (result.status === 200) {
        openNotification("success", "Success", "Store created !");
        navigate(ROUTES.Stores);
      }
    } catch (error: any) {
      console.log("Error while creating the user: ", error);
      openNotification("error");
    } finally {
    }
  };


  return (
    <Layout>
      <div className="w-full flex justify-between items-start">
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center">
            <Title level={2}>Create Store</Title>
            <Breadcrumb
              items={[
                {
                  path: ROUTES.Stores,
                  title: "Stores",
                },
                {
                  title: "Create",
                },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="w-full h-[100px] flex justify-between items-center  mt-6 mb-4">
        <div className="w-full flex flex-col justify-center items-start">
          <Link
            to={ROUTES.Stores}
            className="flex justiy-start items-center text-gray-600"
          >
            <BsArrowLeftShort size={28} className=" mr-2" />
            <p className="font-semibold pb-1">Stores</p>
          </Link>
          <div className="w-full h-full flex justify-start items-center">
            <img
                className="border-2 border-white rounded-lg shadow-md transition hover:cursor-pointer hover:shadow-lg hover:scale-105"
                width={75}
                height={55}
                src={require("src/assets/images/store-image-placeholder.png")}
            />
            <div className="ml-3 w-full flex flex-col justify-center items-start font-semibold">
              <p className="text-2xl">{methods.getValues("Name") || 'Store name'}</p>
              <p className="text-sm text-gray-400">
                {methods.getValues("Description") || 'Store description'}
              </p>
            </div>
          </div>
        </div>

        <div></div>
      </div>

      <div className="w-full">
        <Card className="w-full flex-col rounded-none rounded-t-lg overflow-y-scroll ">
          <BasicInfo methods={methods} />
        </Card>
        <div className="w-full h-[70px] bg-gray-400/20 flex justify-between items-center px-8 rounded-b-lg border-t-2 border-secondary">
          <div></div>
          <Button className="" type="secondary" onClick={handleCreateStore}>
            Create
          </Button>
        </div>
      </div>
    </Layout>
  );
}
