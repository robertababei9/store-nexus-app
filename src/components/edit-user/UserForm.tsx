import React from 'react';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import { Controller, UseFormReturn, useForm } from 'react-hook-form';
import { Col, Row, Card, DatePicker, Layout, DatePickerProps } from 'antd';
import UserAvatar from './UserAvatar';
import { Button, Dropdown } from '../_shared';
import { UserFormType } from 'src/types/users';



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
  methods: UseFormReturn<UserFormType, any, undefined>
}

// In parinte se cheama UserForm si aici AddEditUserPage
// nu e gresit dar e mai ok sa aiba acelasi nume
export default function AddEditUserPage({
  methods
}: UserFormProps) {

  //De vazut aici daca e bun !!!!!!!!!!!!!!!!!!!!!!!!!!
  const handleSave = async () => {
    console.log("user form data = ", methods.getValues());
    const isValid = await methods.trigger();

    if (!isValid) {
      return;
    }
  }

  ///////// AIci de facut firstName + lastName = name.... vedem cum
  methods.watch("firstName");

  return (
    // mx = margin x = margin horizontal ( axa x,y )
    <div className='mx-4 '>
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Card
            title={<div className="text-left font-semibold">Profile Picture</div>}
            className='w-full hover:shadow-[0_5px_15px_0_rgba(0,0,0,0.07)]'>
            <UserDetailsCard
              name='Nume Utilizator'
              location='Locație'
              email='email@example.com'
            />

            <div className="pt-5 text-left">
              <Button type="secondary" onClick={handleSave} >
                Upload Avatar
              </Button>
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
                  name={`firstName`}
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
                  name={`lastName`}
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
                  name={`email`}
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

            <Row gutter={16}>

              <Col xs={24} md={8}>
                <Controller
                  name={`phoneNumber`}
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
                  name={`country`}
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
                  name={`city`}
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
                  name={`role`}
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
                      options={[
                        { label: "Admin", value: "guid-1" },
                        { label: "Manager", value: "guid-2" },
                        { label: "User", value: "guid-3" },
                      ]}
                      defaultValue={value}
                      onChange={onChange}
                      error={error?.message != undefined}
                    />
                  )}
                />
              </Col>

              <Col xs={24} md={12}>
                <Controller
                  name={`signupDate`}
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

            <div className="pt-5 text-left">
              <Button type="secondary" onClick={handleSave} >
                Change Details
              </Button>
            </div>

          </Card>
        </Col>
      </Row>
    </div>


  );
}



