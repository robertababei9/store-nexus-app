import { useState, useEffect } from 'react';
import { Modal } from 'antd'
import { Controller, useForm } from 'react-hook-form';
import { InviteUserForm, Role } from 'src/types/users';
import { TextField } from '@mui/material';
import { Button, Dropdown } from '../_shared';
import axios from 'axios';
import { getDefaultApiUrl } from 'src/config';
import { ApiResponseModel, OptionType } from 'src/types/_shared';
import { openNotification } from 'src/utils/Notification';

type InviteUserModalProps = {
    isOpen?: boolean;
    onClose: () => void
}

export default function InviteUserModal({
    isOpen = false,
    onClose = () => {}
}: InviteUserModalProps) {

    // form
    const methods = useForm<InviteUserForm>({
        defaultValues: {
          Email: '',
          RoleId: ''
        }
      })

    // states
    const [isModalOpen, setIsModalOpen] = useState(isOpen);
    const [roleOptions, setRoleOptions] = useState<OptionType[]>([]);
    const [roleOptionsLoading, setRoleOptionsLoading] = useState<boolean>(true);
    const [sendInviteLoading, setSendInviteLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);

    // effects
    useEffect(() => {
        fetchRoles();
    }, []);

    useEffect(() => {
        setIsModalOpen(isOpen);
    }, [isOpen])

    // handlers
    const handleSendInvitation = async () => {
        const isValid = await methods.trigger();

        if (!isValid) {
            return;
        }

        const formValues = methods.getValues();

        try {
            setSendInviteLoading(true);
            const result = await axios.post<ApiResponseModel>(getDefaultApiUrl() + "/api/users/InviteUser", formValues, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })

            // console.log("result.data = ", result.data);
            if (result.status === 200) {
                if (result.data.Success) {
                    setIsModalOpen(false);
                    onClose();
                    openNotification("success", "Success", `Invitation sent to ${formValues.Email}!`);
                    setErrors([]);
                }
                else {
                    // console.log("result.data.Errors ===== ", result.data.Errors);
                    setErrors(result.data.Errors);
                }

            }

        }
        catch(error: any) {
            console.log("Error while inviting the user: ", error);
            openNotification("error");
        }
        finally {
            setSendInviteLoading(false);
        }
    }


    // helpers
    const fetchRoles = async () => {
        try {
        const result = await axios.get<Role[]>(getDefaultApiUrl() + "/api/users/GetUserRoles", {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        });

        if (result.data) {
            const roleOptions: OptionType[] = result.data.map(x => ({value: x.Id, label: x.Name}));
            setRoleOptions(roleOptions);
        }

        }
        catch( error: any) {
            console.log("Error while trying to get the Roles");
        }
        finally {
            setRoleOptionsLoading(false);
        }
    }

    return (
        <Modal
            // title="Invite a user to create the account"
            centered
            open={isModalOpen}
            onOk={() => setIsModalOpen(false)}
            // okText="Send invitation"
            onCancel={() => {
                setIsModalOpen(false);
                onClose();
            }}
            footer={(
                <div className='mt-6 flex justify-end items-end'>
                    <Button
                        type='secondary'
                        className='flex justify-center items-center ml-5'
                        onClick={handleSendInvitation}
                        loading={sendInviteLoading}
                        disabled={sendInviteLoading}
                    >
                        Send invitation
                    </Button>
                </div>
            )}
            // width={1000}
        >
            <p className='mb-3 text-2xl font-semibold text-gray-900'>Invite a user to create an account</p>

            <p className='mb-6 text-base text-gray-500'>The user will receive and e-mail with instructions to
            create an account with the selected role bellow</p>

            <Controller
                name={`Email`}
                control={methods.control}
                rules={{
                    required: true
                }}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                }) => (
                    <TextField
                        name='email'
                        className='w-full'
                        style={{ marginBottom: 15 }}
                        label='Email'
                        variant="outlined"
                        value={value}
                        onChange={(value) => {
                            onChange(value);
                        }}
                        size='medium'
                        error={error !== undefined}
                        required
                    />
                )}
            />

            <Controller
                name={`RoleId`}
                control={methods.control}
                rules={{
                    required: true
                }}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                }) => (
                    <Dropdown
                        placeholder='Select Role *'
                        options={roleOptions}
                        loading={roleOptionsLoading}
                        defaultValue={value}
                        onChange={onChange}
                        error={error?.message != undefined}
                    />
                )}
            />
            <div className='flex flex-col mt-5'>
                {
                    errors.map((message: string, index: number) => (
                        <p key={index} className='text-red-500 text-sm font-semibold'>{message}</p>
                    ))
                }
            </div>
        </Modal>
    )
}
