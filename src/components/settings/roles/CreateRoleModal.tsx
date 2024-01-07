import { useState, useEffect } from 'react';
import { Modal } from 'antd'
import { Controller, useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import { Button } from '../../_shared';
import { CreateRoleForm } from 'src/types/permissions';
import axios from 'axios';
import { ApiResponseModel } from 'src/types/_shared';
import { getDefaultApiUrl } from 'src/config';
import { openNotification } from 'src/utils/Notification';

type CreateRoleModalProps = {
    isOpen?: boolean;
    onClose: () => void;
    onCreateCompleted: (roleName: string) => void
}

export default function CreateRoleModal({
    isOpen = false,
    onClose = () => { },
    onCreateCompleted = () => { }

}: CreateRoleModalProps) {

    // form
    const methods = useForm<CreateRoleForm>({
        defaultValues: {
            RoleName: ''
        }
    })

    // states
    const [isModalOpen, setIsModalOpen] = useState(isOpen);
    const [createRoleLoading, setCreateRoleLoading] = useState<boolean>(false);

    // effects
    useEffect(() => {
        setIsModalOpen(isOpen);
    }, [isOpen])

    // handlers
    const handleCreateRole = async () => {
        const isValid = await methods.trigger();

        if (!isValid) {
            return;
        }

        const roleName = methods.getValues("RoleName")

        setCreateRoleLoading(true);
        try {
            const result = await axios.post<ApiResponseModel>(getDefaultApiUrl() + `/api/settings/CreateRole/${roleName}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        'Content-Type': 'application/json'
                    },
                });
            console.log("result=", result);

            if (result.data.Success) {
                const roleName = methods.getValues("RoleName");
                // const roleId = result.data.Data;
                onCreateCompleted(roleName);
                onClose();
                openNotification("success", "Success", "Role created successfully")

            }
        }
        catch (error: any) {
            console.log("Error while trying to get the Roles", error);
        }
        finally {
            setCreateRoleLoading(false);
        }
    }

    return (
        <Modal
            centered
            open={isModalOpen}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => {
                setIsModalOpen(false);
                onClose();
            }}
            footer={(
                <div className='mt-6 flex justify-end items-end'>
                    <Button
                        type='secondary'
                        className='flex justify-center items-center ml-5'
                        loading={createRoleLoading}
                        disabled={createRoleLoading}
                        onClick={handleCreateRole}
                    >
                        Create
                    </Button>
                </div>
            )}
        >
            <p className='mb-3 text-2xl font-semibold text-gray-900'>Create a new role</p>

            <p className='mb-6 text-base text-gray-500'>Define a new role with specific permissions and access rights.
                Customize the role to tailor it to the responsibilities and requirements within your organization.</p>
            <Controller
                name={`RoleName`}
                control={methods.control}
                rules={{
                    required: true
                }}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                }) => (
                    <TextField
                        className='w-full'
                        style={{ marginBottom: 15 }}
                        label='New role'
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
        </Modal>
    )
}
