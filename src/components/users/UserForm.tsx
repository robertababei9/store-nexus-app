import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Controller, UseFormReturn } from 'react-hook-form';
import { Col, Row, Card, DatePicker, DatePickerProps } from 'antd';
import { TextField } from '@mui/material';

import { Button, Dropdown, LoadingWrapper } from '../_shared';
import UserAvatar from './UserAvatar';
import { Role, UserFormType } from 'src/types/users';
import DropdownMultiple from '../_shared/DropdownMultiple/DropdownMultiple';
import { OptionType } from 'src/types/_shared';
import axios from 'axios';
import { getDefaultApiUrl } from 'src/config';


const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const UserDetailsCard: React.FC<{ name: string; location: string; email: string }> = ({
  name,
  location,
  email,
}) => (
  <Card className='mb-4 border-0'>
    <div className='flex flex-col items-center p-4'>
      <UserAvatar />
      <div className='text-center'>
        <p className='text-xl font-semibold'>{name}</p>
        <p className='text-gray-600'>{location}</p>
        <p className='text-gray-600'>{email}</p>
      </div>
    </div>
  </Card>
);

type UserFormProps = {
  methods: UseFormReturn<UserFormType, any, undefined>,
  handleSave?: () => any,
  loading?: boolean,
  buttonLoading?: boolean,
  editable?: boolean,
  addUser?: boolean
}

// In parinte se cheama UserForm si aici AddEditUserPage
// nu e gresit dar e mai ok sa aiba acelasi nume
export default function AddEditUserPage({
  methods,
  handleSave = () => {},
  loading = false,
  buttonLoading = false,
  editable = true,
  addUser = false
}: UserFormProps) {

  // states
  const [roleOptions, setRoleOptions] = useState<OptionType[]>([])
  const [roleOptionsLoading, setRoleOptionsLoading] = useState<boolean>(true);

  // effects
  useEffect(() => {
    fetchRoles();
  }, []);


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

  const handleSaveClick = async () => {
    handleSave();

  }

  ///////// AIci de facut firstName + lastName = name.... vedem cum
  methods.watch("FirstName");
  methods.watch("LastName");

  return (
    <LoadingWrapper loading={loading}>
      <div className='mx-4 '>
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Card
              title={<div className="text-left font-semibold">Profile Picture</div>}
              className='w-full hover:shadow-[0_5px_15px_0_rgba(0,0,0,0.07)]'>
              <UserDetailsCard
                name={`${methods.getValues("FirstName") ?? "User"} ${methods.getValues("LastName") ?? "Name"}`}
                location={`${methods.getValues("Country") ?? "Country"}, ${methods.getValues("City") ?? "City"}`}
                email={`${methods.getValues("Email") ?? "Email"}`}
              />

              <div className="pt-5 text-left">
                {
                  editable && (
                    <Button type="secondary" onClick={handleSave} >
                      Upload Avatar
                    </Button>
                  )
                }
              </div>

            </Card>
          </Col>

          <Col xs={24} md={16}>
            <Card
              title={<div className="text-left font-semibold">Account Details</div>}
              className='w-full mb-4 hover:shadow-[0_5px_15px_0_rgba(0,0,0,0.07)]'>

              <Row gutter={16}>
                <Col xs={24} md={12}>
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
                </Col>

                <Col xs={24} md={12}>
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
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={24}>
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
                </Col>
              </Row>

              {
                // We display this only if the prop it's set to ADD USER
                addUser && (
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
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
                                        // style={{ marginBottom: 15 }}
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
                    </Col>

                    <Col xs={24} md={12}>
                        <Controller
                              name={`PasswordConfirm`}
                              control={methods.control}
                              rules={{
                                  required: true,

                                  validate: {
                                      passwordMatch: (value) => value === methods.getValues("PasswordConfirm") || "Password do not match",
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
                    </Col>
                  </Row>
                )
              }

              <Row gutter={16}>

                <Col xs={24} md={8}>
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
                </Col>

                <Col xs={24} md={8}>
                  <Controller
                    name={`Country`}
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
                        label='Country'
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
                </Col>

                <Col xs={24} md={8}>
                  <Controller
                    name={`City`}
                    control={methods.control}
                    rules={{
                      required: false
                    }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        className='w-full'
                        style={{ marginBottom: 15 }}
                        label='City'
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
                </Col>

              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
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
                        defaultValue={value}
                        onChange={onChange}
                        error={error?.message != undefined}
                      />
                    )}
                  />
                </Col>

                <Col xs={24} md={12}>
                    <Controller
                        name={`SignUpDate`}
                        control={methods.control}
                        rules={{
                          required: true
                        }}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <DatePicker
                            //SI AICI E CIUDAT PT CA INALTIMILE SUNT DIFERITE DAR LA FEL PE WEB
                            style={{ marginBottom: 20, width: '100%', height: '100%' }}
                            format="DD-MMM-YYYY"
                            value={value ? dayjs(value) : null}
                            onChange={((date: any, dateString: string) => onChange(dateString))}
                            placeholder='Signed Up *'
                            status={error ? "error" : ""}
                          />
                        )}
                    />
                </Col>

              </Row>

              <Row gutter={16} className='mt-4'>
                <Col xs={24} md={12}>
                  <Controller
                    name={`StoreId`}
                    control={methods.control}
                    rules={{
                      required: true
                    }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <DropdownMultiple 
                          options={[
                                { label: "Ldil", value: "store-1" },
                                { label: "Profi SRL", value: "store-2" },
                                { label: "S.C. Admir 24h", value: "store-3" },
                                { label: "Kaufland", value: "store-4" },
                                { label: "EMAG SRL 2102234", value: "store-5" },
                                { label: "Robert Ababei SRL ", value: "store-6" },
                                { label: "Cobyul", value: "store-7" }
                          ]}
                          placeholder='Select stores for user *'
                      
                      />
                    )}
                  />
                </Col>

                <Col xs={24} md={12}>
                  
                  </Col>
              </Row>

              <div className="pt-5 text-left">
                {
                  editable && (
                    <Button type="secondary" onClick={handleSaveClick} loading={buttonLoading}>
                      Change Details
                    </Button>
                  )
                }
              </div>

            </Card>
          </Col>
        </Row>
      </div>
    </LoadingWrapper>


  );
}



