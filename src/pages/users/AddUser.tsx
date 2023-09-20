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
import Permissions from "src/components/edit-user/Permissions";

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

    // Aici nu stiu daca ar trebui pastrat 1 singur form sau cate 1 pt fiecare tab pt ca:
    // Butonul de SAVE e unul singur sus - pt toate tabs-urile
    // si daca e sa modifici cate ceva in fiecare tab si dupa sa dai save => trebuie sa faci handle la fiecare form din asta ( methods, methodsSecurity )
    // 
    //nu o sa stea butonul de save acolo, plus ca e si urat butonul tau, e mic de fraieri, nu poti sa dai calumea save
    //o sa fie buton pt fiecare tab daca asa, gen Change password, Save la basic info, ca sa nu mai existe si spatiul gol

    // E mai fain butonul meu. A<l tau e mare si gras
    //ca sa nu il ratezi :) al tau e mic, doar culoarea e faina --- deci ramane al meu pt ca asa avem si in invoices --- bine ... mai trebuie modificate

    // nu . Nu punem buton in fiecare tab
    // pt ca .. cum ti-am zis... faci modificari in fiecare tab si apoi vrei sa dai un singur save... nu 15
    //uite asa sa fie
    //nu e bun ca asa nu are buton de save :))
    // la update pass poate sa fie acolo separat, dar doar atat, mai vedem dupa, da
    // pai in cazul asta Daca e un singur buton de save ... structura form-ului ar trebui sa se modifice asa

    //      userForm: {
    //          basicInfo: UserBasicInfoType <---- UserFormType,
    //          security: userSecurityType <---- TO BE CREATED,
    //          roles: userRolesType <---- ....
    //      }
    //  Si la SAVE -> form-ul asta se trimite cu totul la server ... si acolo server-ul face ce are de facut, verifica datele, le salveaza in parte

    // Sa nu stergi comm asta pt urm 2-3 zile

    const methods = useForm<UserFormType>({
        // default methods o sa fie populate cand luam valorile de la backend
        // asa doar in caz de Edit
        defaultValues: {}
    });

    const methodsSecurity = useForm<SecurityFormType>({
        defaultValues: {
            currentPass: "",
            newPass: '',
            repeatPass: '',
        }
    });

    const handleSave = async () => {
        console.log("user form data = ", methods.getValues());
        const isValid = await methods.trigger();

        if (!isValid) {
            return;
        }
    }


    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Profile',
            children: <UserForm methods={methods} />,
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