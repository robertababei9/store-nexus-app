import React from 'react';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import { Controller, UseFormReturn } from 'react-hook-form';
import { Col, Row, Card, DatePicker, Layout, DatePickerProps } from 'antd';
import UserAvatar from './UserAvatar';
import { Dropdown } from '../_shared';
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
    <TextField
      style={{ marginBottom: 20, width: '100%' }}
      label='About me'
      variant="outlined"
      onChange={value => console.log("value = ", value)}
      multiline
      rows={3}
    />
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

  methods.watch("name");

  return (
    <Layout className='relative'>

      <div className='w-full'>
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Card className='w-full mb-4'>
              <UserDetailsCard
                name='Nume Utilizator'
                location='Locație'
                email='email@example.com'
              />
            </Card>
          </Col>

          <Col xs={24} md={16}>
            <Card className='w-full mb-4'>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Controller
                    name={`name`}
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
                        label='Full Name'
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
                        label='Contact'
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

                <Col xs={24} md={8}>

                </Col>

              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <TextField
                    style={{ marginBottom: 20, width: '100%' }}
                    label='Location'
                    variant="outlined"
                    onChange={value => console.log("Location value =", value)}
                    required
                  />
                </Col>

                <Col xs={24} md={12}>
                  <TextField
                    style={{ marginBottom: 20, width: '100%' }}
                    label='Country'
                    variant="outlined"
                    onChange={value => console.log("Country value =", value)}
                    required
                  />
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <TextField
                    style={{ marginBottom: 20, width: '100%' }}
                    label='Contact'
                    variant="outlined"
                    onChange={value => console.log("Contact value =", value)}
                    required
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


              {/* Save button  */}
              {/* Ai de plm */}
              {/* ey stiu ce trb sters, is de 2 ori scrise, ai avut 2 functii... */}
              {/* <div className='text-right mt-4'>
              <Button
                type='primary'
                style={{ height: '40px', backgroundColor: '#4361ee', borderColor: '#4361ee', marginRight: '24px' }}
                onClick={() => console.log('Save button clicked')}

              >
                <strong style={{ fontWeight: 'bold' }}>Save</strong>
              </Button>
              </div> */}



            </Card>
          </Col>
        </Row>
      </div>

    </Layout>

  );
}



