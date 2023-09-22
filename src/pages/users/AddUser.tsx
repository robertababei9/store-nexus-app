import { useState } from 'react'
import { Steps, Tabs, Typography } from 'antd';
import { useForm } from 'react-hook-form';
import { Breadcrumb, Button, Card, Layout } from 'src/components/_shared'
import UserForm from 'src/components/users/UserForm';
import { UserFormType } from 'src/types/users';
import { ROUTES } from 'src/utils/Constants';
import Permissions from 'src/components/users/Permissions';

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


  // form
  const methods = useForm<UserFormType>({
    defaultValues: {}
  })

  // states
  const [current, setCurrent] = useState<number>(0);
  const [nextLoading, setNextLoading] = useState<boolean>(false);


  // handlers
  const handleNext = async () => {

    const isValid = await methods.trigger();

    if (!isValid) {
        return;
    }

    if (current < STEP_ITEMS.length - 1)
      setCurrent(prev => prev + 1);
  }

  const handleAddUser = () => {
    
  }


  return (
    <Layout>
        <div className="w-full flex justify-between items-start">
            <div className="flex items-center">
                <Title level={2}>Add User</Title>
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
                  <UserForm methods={methods} editable={false}/>
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
                      loading={nextLoading}
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
                          type='primary' 
                          onClick={handleAddUser}>
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
