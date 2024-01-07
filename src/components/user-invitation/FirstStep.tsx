import { Controller, UseFormReturn } from 'react-hook-form'
import { TextField } from '@mui/material';

import { UserInvitationFormType } from 'src/types/userInvitation';


type FirstStepProps = {
methods: UseFormReturn<UserInvitationFormType, any, undefined>,
}

export default function FirstStep({
    methods
}: FirstStepProps) {
  return (
    <div>
        <Controller
            name={`Email`}
            control={methods.control}
            rules={{
                // required: true
            }}
            render={({
                field: { onChange, value },
                fieldState: { error },
            }) => (
                <TextField
                    className='w-full'
                    style={{ marginBottom: 15 }}
                    label='Email'
                    name='email'
                    variant="outlined"
                    value={value}
                    // defaultValue={"robert.ababei9@gmail.com"}
                    // onChange={(value) => {
                    //     onChange(value);
                    // }}
                    
                    size='medium'
                    error={error !== undefined}
                    required
                    disabled={true}
                />
            )}
        />

        <Controller
            name={`FirstName`}
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
                    label='First Name'
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
            name={`LastName`}
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
                label='Last Name'
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
                name={`PhoneNumber`}
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
                    label='Phone Number'
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
    </div>
  )
}
