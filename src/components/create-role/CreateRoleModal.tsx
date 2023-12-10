import { useState, useEffect } from 'react';
import { Modal } from 'antd'
import { Controller, useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import { Button } from '../_shared';
import { CreateRoleForm } from 'src/types/permissions';

type CreateRoleModalProps = {
    isOpen?: boolean;
    onClose: () => void
}

export default function CreateRoleModal({
    isOpen = false,
    onClose = () => {}
}: CreateRoleModalProps) {

    // form
    const methods = useForm<CreateRoleForm>({
        defaultValues: {
          RoleId: ''
        }
      })

    // states
    const [isModalOpen, setIsModalOpen] = useState(isOpen);

    // effects
    useEffect(() => {
        setIsModalOpen(isOpen);
    }, [isOpen])

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
                        // onClick={}
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
                name={`RoleId`}
                control={methods.control}
                rules={{
                    required: true
                }}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                }) => (
                    <TextField
                        name='roleId'
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
