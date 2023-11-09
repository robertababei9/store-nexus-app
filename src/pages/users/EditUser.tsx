import { useEffect, useState, lazy } from 'react';
import { useParams } from "react-router-dom";
import { TabsProps, Typography, Tabs } from "antd";
import { Breadcrumb, Card, Layout } from "src/components/_shared";
import { ROUTES } from "src/utils/Constants";
import UserForm from "src/components/users/UserForm";
import { SecurityFormType, UserFormType, UserResponse } from "src/types/users";

import { useForm } from "react-hook-form";
import Security from "src/components/users/Security";
import { getDefaultApiUrl } from 'src/config';
import axios from 'axios';
import { openNotification } from 'src/utils/Notification';
import dayjs from 'dayjs';


const PermissionsTab = lazy(() => import('src/components/users/Permissions'))

const Title = Typography.Title;


export default function EditUser() {

    const params = useParams();

    // states
    const [profileLoading, setProfileLoading] = useState<boolean>(true);
    const [updateLoading, setUpdateLoading] = useState<boolean>(false);

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
            NewPassword: '',
            ConfirmNewPassword: '',
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
            setUpdateLoading(true);

            const body: UserFormType = methods.getValues();
            body.SignUpDate = dayjs(methods.getValues("SignUpDate")).format('YYYY-MM-DD').toString();
            console.log("User -> Edit -> body = ", body);

            const BASE_URL = getDefaultApiUrl();
            const result = await axios.put(`${BASE_URL}/api/users/Edit`, body, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });

            if (result.data) {
                openNotification("success", "Success", "User profile successfully updated")
            }
        }
        catch (err: any) {
            console.log(err);
            openNotification("error");
        }
        finally {
            setUpdateLoading(false);
        }
    }



    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Profile',
            children: 
                <UserForm 
                    methods={methods} 
                    handleSave={handleAccountDetailsSave} 
                    loading={profileLoading}
                    buttonLoading={updateLoading}
                />,
        },
        {
            key: '2',
            label: 'Security',
            children: <Security methods={methodsSecurity} />,
        },
        {
            key: '3',
            label: `Permissions`,
            children: <PermissionsTab />,
        },
    ];


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
                                title: params.id == '0' ? "Edit User" : "Edit",
                            }
                        ]}
                    />
                </div>
                <Title level={2} className='ml-4'>Edit User</Title>
            </div>

            <Card  className="w-full h-full !px-0">
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