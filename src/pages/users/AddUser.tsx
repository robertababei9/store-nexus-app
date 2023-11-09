import { useState } from 'react'
import { Steps, Typography } from 'antd';
import { useForm } from 'react-hook-form';
import { Breadcrumb, Button, Card, Layout } from 'src/components/_shared'
import UserForm from 'src/components/users/UserForm';
import { UserFormType } from 'src/types/users';
import { ROUTES } from 'src/utils/Constants';
import Permissions from 'src/components/users/Permissions';
import axios from 'axios';
import { getDefaultApiUrl } from 'src/config';
import { openNotification } from 'src/utils/Notification';
import { useNavigate } from 'react-router-dom';

const Title = Typography.Title;

const SlideAnimation = require("react-reveal/Bounce");
const HeadShakeAnimation = require("react-reveal/HeadShake");

const STEP_ITEMS = [
  {
    title: 'Basic Info',
  },
  {
    title: 'Permissions',
  }
]


export default function AddUser() {

  // navigation
  const navigate = useNavigate();

  // form
  const methods = useForm<UserFormType>({
    defaultValues: {
      StoreId: "6B29FC40-CA47-1067-B31D-00DD010662DA"
    }
  })

  // states
  const [current, setCurrent] = useState<number>(0);
  const [createLoading, setCreateLoading] = useState<boolean>(false);


  // handlers
  const handleNext = async () => {

    const isValid = await methods.trigger();

    if (!isValid) {
      return;
    }

    if (current < STEP_ITEMS.length - 1)
      setCurrent(prev => prev + 1);
  }

  const handleAddUser = async () => {
    const isValid = await methods.trigger();

    if (!isValid) {
      return;
    }

    const formValues = methods.getValues();

    try {
      setCreateLoading(true);
      const result = await axios.post<UserFormType>(getDefaultApiUrl() + "/api/users/add", formValues, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      })

      if (result.status === 200) {
        openNotification("success", "Success", "User created !")
        navigate(ROUTES.Users);
      }

    }
    catch (error: any) {
      console.log("Error while creating the user: ", error);
      openNotification("error");
    }
    finally {
      setCreateLoading(false);
    }

    // console.log("formValues = ", formValues);
  }


  return (
    <Layout>
      <div className="w-full flex flex-col items-start">
        <div className="flex items-center">
          <Breadcrumb
            items={[
              {
                path: ROUTES.Users,
                title: "Users"
              },
              {
                title: "Add",
              }
            ]}
          />
        </div>
        <Title level={2} className='ml-4'>Add User</Title>
      </div>


      <div className='w-full bg-white rounded-t-lg h-[70px] px-8 pt-8 flex justify-center items-center'>
        <Steps
          className='max-w-[512px]'
          current={current}
          items={[
            {
              title: 'Basic Info',
            },
            {
              title: 'Permissions',
            }
          ]}
        />
      </div>
      <Card className='w-full h-full rounded-none overflow-y-scroll'>
        {
          current == 0 && (
            <SlideAnimation down>
              <UserForm methods={methods} editable={false} addUser={true} />
            </SlideAnimation>
          )
        }

        {
          current == 1 && (
            <Permissions />
          )
        }
      </Card>
      <div className='w-full h-[70px] bg-white rounded-b-lg px-8 pb-8 flex justify-between items-center'>
        {
          ([1].includes(current)) ? (
            <Button type='secondary' onClick={() => setCurrent(prev => prev - 1)}>Previous</Button>
          ) : (
            <div></div>
          )
        }
        {
          ([0].includes(current)) ? (
            <Button
              type='secondary'
              onClick={handleNext}
            >
              Next
            </Button>
          ) : (
            <div></div>
          )
        }
        {
          ([1].includes(current)) ? (
            <HeadShakeAnimation delay={6000}>
              <Button
                className={`${current == 1 ? "scale-110" : ""}`}
                type='secondary'
                onClick={handleAddUser}
                loading={createLoading}
              >
                Add User
              </Button>
            </HeadShakeAnimation>
          ) : (
            <></>
          )
        }
      </div>

    </Layout>
  )
}
