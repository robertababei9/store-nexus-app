import { AiOutlineHome, AiOutlineSave } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { TabsProps, Typography, Tabs } from "antd";
import { Breadcrumb, Button, Card, Layout } from "src/components/_shared";
import { ROUTES } from "src/utils/Constants";
import UserForm from "src/components/edit-user/UserForm";
import { SecurityFormType, UserFormType } from "src/types/users";



import ComingSoonSvg from 'src/assets/images/git.svg'
import { useForm } from "react-hook-form";
import Security from "src/components/edit-user/Security";

const ComingSoon = () => {
    return (
        <div className='w-full h-full flex flex-col justify-center items-center'>
            <img src={ComingSoonSvg} width={450} height={250} />
            <p className='font-semibold text-3xl mt-3'>Coming Soon</p>
            <p className='text-xl font-semibold mt-2'>This product it's currently in development, but be sure to check back for updates !</p>
        </div>
    )
}

//   const INITIAL_STORE_DATA: StoreDataType = {
//     name: "My store name",
//     description: "Some small details about the store. Could be anything",
//   }

const Title = Typography.Title;


export default function AddUsers() {

    const params = useParams();
    // form
    const methods = useForm<UserFormType>({
        // default methods o sa fie populate cand luam valorile de la backend
        // asa doar in caz de Edit
        defaultValues: {}
    });

    const handleSave = async () => {
        console.log("user form data = ", methods.getValues());
        const isValid = await methods.trigger();

        if (!isValid) {
            return;
        }
    }

    /// mmm ... imediat ma intorc aici
    const methodsSecurity = useForm<SecurityFormType>({
        defaultValues: {
            currentPass: "",
            newPass: '',
            repeatPass: '',
        }
    });

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Basic info`,
            children: <UserForm methods={methods} />,
        },
        {
            key: '2',
            label: `Security`,
            children: <Security methods={methodsSecurity} />,
        },
        {
            key: '3',
            label: `Role`,
            children: <ComingSoon />,
        },
    ];


    return (
        <Layout>
            <div className="flex items-center">
                <Title level={2}>Add User</Title>
                <Breadcrumb
                    items={[
                        {
                            path: ROUTES.Users,
                            title: "Users"
                        },
                        {
                            title: params.id == '0' ? "Add User" : "Edit",
                        }
                    ]}
                />
            </div>

            {/* Save button  */}
            <div className="w-full h-[100px] flex justify-end items-center  mt-6 mb-4">
                <Button className="w-[80px]"
                    type='primary'
                    // Folosim Tailwind pt styling .. nu style ---> className
                    style={{ height: '40px', backgroundColor: '#4361ee', borderColor: '#4361ee', marginRight: '24px' }}
                    onClick={handleSave}

                >
                    <strong style={{ fontWeight: 'bold' }}>Save</strong>
                </Button>
 
                {/* Ramane butonul de jos. Ti-am lasat ambele sa compari */}
                <Button type="secondary" onClick={handleSave} className="flex items-center">
                     Save
                     <AiOutlineSave color="#FFF" size={20} className="ml-3"/>
                 </Button> 
            </div>

            <Card className="w-full h-full !px-0">

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