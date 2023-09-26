import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { TabsProps, Typography, Tabs } from "antd";
import { Breadcrumb, Button, Card, Layout } from "src/components/_shared";
import { ROUTES } from "src/utils/Constants";
import UserForm from "src/components/users/UserForm";
import { SecurityFormType, UserFormType, UserResponse } from "src/types/users";



import ComingSoonSvg from 'src/assets/images/git.svg'
import { useForm } from "react-hook-form";
import Security from "src/components/users/Security";
import Permissions from "src/components/users/Permissions";
import { getDefaultApiUrl } from 'src/config';
import axios from 'axios';
import { openNotification } from 'src/utils/Notification';

const ComingSoon = () => {
    return (
        <div className='w-full h-full flex flex-col justify-center items-center'>
            <img src={ComingSoonSvg} width={450} height={250} />
            <p className='font-semibold text-3xl mt-3'>Coming Soon</p>
            <p className='text-xl font-semibold mt-2'>This product it's currently in development, but be sure to check back for updates !</p>
        </div>
    )
}


const Title = Typography.Title;


export default function EditUser() {

    const params = useParams();

    // states
    const [profileLoading, setProfileLoading] = useState<boolean>(true);

    // form
    const methods = useForm<UserFormType>({
        defaultValues: {
            FirstName: "",
            LastName: "",
            Email: "",
            PhoneNumber: "",
            Country: "",
            City: "",
            SignUpDate: ""
        }
    });
    const methodsSecurity = useForm<SecurityFormType>({
        defaultValues: {
            currentPass: "",
            newPass: '',
            repeatPass: '',
        }
    });

    // effects
    useEffect(() => {
        if (params.id) {
            getUserById(params.id);
        }
    }, []);

    // helpers
    const getUserById = async (id: string) => {
        try {
            const BASE_URL = getDefaultApiUrl();
            const result = await axios.get<UserResponse>(`${BASE_URL}/api/users/GetById/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });

            if (result.data) {
                console.log("data = ", result.data);
                // methods.setValue("FirstName", result.data.FirstName);
                methods.reset(result.data)
            }
        }
        catch (error: any) {
            console.log(`Error while geting the user data for ${params.id}: ${error}`);
            openNotification("error", "Error", "Error while getting the user profile");
        }
        finally {
            setProfileLoading(false);
        }



    }

    // handlers
    const handleAccountDetailsSave = async () => {
        const isValid = await methods.trigger();

        if (!isValid) {
            return;
        }

        try {

        }
        catch (error: any) {

        }
        finally {

        }
    }



    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Profile',
            children: <UserForm methods={methods} handleSave={handleAccountDetailsSave}/>,
        },
        {
            key: '2',
            label: 'Security',
            children: <Security methods={methodsSecurity} />,
        },
        {
            key: '3',
            label: `Permissions`,
            children: <Permissions />,
        },
    ];


    return (
        <Layout>
            <div className="w-full flex justify-between items-start">
                <div className="flex items-center">
                    <Title level={2}>Edit User</Title>
                    <Breadcrumb
                        items={[
                            {
                                path: ROUTES.Users,
                                title: "Users"
                            },
                            {
                                title: params.id == '0' ? "Edit User" : "Edit",
                            }
                        ]}
                    />
                </div>

            </div>

            <Card  className="mt-5 w-full h-full !px-0">

                <Tabs
                    tabBarStyle={{ paddingLeft: 18 }}
                    size='large'
                    defaultActiveKey="1"
                    items={items}
                    onChange={() => { }}
                />

            </Card>

        </Layout>

    )
}