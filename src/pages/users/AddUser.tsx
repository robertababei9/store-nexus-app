import { Breadcrumb, Card, Typography } from "antd";
import { AiOutlineHome, AiOutlineSave } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { ROUTES } from "src/utils/Constants";
import UserForm from "src/components/edit-user/UserForm";
import { Button } from "src/components/_shared";
import { useForm } from "react-hook-form";
import { UserFormType } from "src/types/users";

const Title = Typography.Title;

export default function AddUsers() {

    const params = useParams();
    const methods = useForm<UserFormType>({
        defaultValues: {}
    });

    const handleSave = async () => {
        console.log("user form data = ", methods.getValues());
        const isValid = await methods.trigger();

        if (!isValid) {
            return;
        }
    }


    return (
        <div className='w-full h-full flex flex-col justify-start items-start overflow-y-scroll sm:px-16 px-4 sm:py-8 py-6 '>

            <div className="w-full flex justify-between items-center">
                <div className="flex items-center">
                    <Title>Add User</Title>
                    {/*  */}
                    {/*  */}
                    {/* Breadcrumb-ul acum arata altfel. Modifica-l */}
                    {/*  */}
                    {/*  */}
                    <Breadcrumb
                        className="ml-8"
                        items={[
                            {
                                title: (
                                    <div className='b-6 '>
                                        <Link className='text-blue-500' to={ROUTES.Dashboard}>
                                            <AiOutlineHome size={22} className='text-blue-400' />
                                        </Link>

                                    </div>
                                ),
                            },
                            {
                                title: (
                                    <Link to={ROUTES.Users}>Users</Link>
                                ),
                            },
                            {
                                title: params.id == '0' ? "Add User" : "Edit",
                            }
                        ]}
                    />
                </div>

                <Button type="secondary" onClick={handleSave} className="flex items-center">
                    Save
                    <AiOutlineSave color="#FFF" size={20} className="ml-3"/>
                </Button>

            </div>
            <div className='h-full w-full'>
                <UserForm methods={methods}/>
            </div>

        </div>
    )
}