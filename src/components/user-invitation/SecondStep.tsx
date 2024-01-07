import { Controller, UseFormReturn } from 'react-hook-form'
import { TextField } from '@mui/material';

import { UserInvitationFormType } from 'src/types/userInvitation';


type SecondStepProps = {
methods: UseFormReturn<UserInvitationFormType, any, undefined>,
}

export default function SecondStep({
    methods
}: SecondStepProps) {
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
                    style={{ marginBottom: 30 }}
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

        {/* TODO: Create separate component for password. All comps will have the same rules across the app */}
        <Controller
            name={`Password`}
            control={methods.control}
            rules={{
                required: true,
                minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                },
                pattern: {
                    value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/, // Requires at least one number and one special character
                    message: "Password must include at least one number and one special character",
                },
            }}
            render={({ field, fieldState: { error } }) => (
                <div>
                    <TextField
                        className='w-full'
                        style={{ marginBottom: 15 }}
                        label='New Password'
                        type='password'
                        variant="outlined"
                        value={field.value}
                        onChange={field.onChange}
                        size='medium'
                        error={error !== undefined}
                        required
                    />
                    {error && (
                        <p className="italic text-left text-red-500 text-sm mb-2">{error.message}</p>
                    )}
                </div>
            )}
        />

        <Controller
            name={`PasswordConfirm`}
            control={methods.control}
            rules={{
                required: true,

                validate: {
                    passwordMatch: (value) => value === methods.getValues("Password") || "Password do not match",
                },
            }}
            render={({
                field, fieldState: { error }
            }) => (
                <div>
                    <TextField
                        className='w-full'
                        style={{ marginBottom: 15 }}
                        label='Confirm New Password'
                        type='password'
                        variant="outlined"
                        value={field.value}
                        onChange={field.onChange}
                        size='medium'
                        error={error !== undefined}
                        required
                    />
                    {error && (
                        <p className="italic text-left text-red-500 text-sm">{error.message}</p>
                    )}
                </div>
            )}
        />

    </div>
  )
}
