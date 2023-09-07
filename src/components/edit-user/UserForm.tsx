import React from 'react';
import { TextField } from '@mui/material';
import { Col, Row, Card, Layout } from 'antd';
import UserAvatar from './UserAvatar';
import { Dropdown } from '../_shared';
import { Controller, UseFormReturn } from 'react-hook-form';
import { UserFormType } from 'src/types/users';


const UserDetailsCard: React.FC<{ name: string; location: string; email: string }> = ({
  name,
  location,
  email,
}) => (
  <Card className='mb-4'>
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
                  <TextField
                    style={{ marginBottom: 20, width: '100%' }}
                    label='Name'
                    variant="outlined"
                    onChange={value => console.log("Name value =", value)}
                    required
                  />
                </Col>

                <Col xs={24} md={12}>
                  <TextField
                    style={{ marginBottom: 20, width: '100%' }}
                    label='Email'
                    variant="outlined"
                    onChange={value => console.log("Email value =", value)}
                    required
                  />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={8}>
                  <TextField
                    style={{ marginBottom: 20, width: '100%' }}
                    label='Company'
                    variant="outlined"
                    onChange={value => console.log("Company value =", value)}
                    required
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
                                {label: "Admin", value: "guid-1"},
                                {label: "Manager", value: "guid-2"},
                                {label: "User", value: "guid-3"},
                              ]}
                              defaultValue={value}
                              onChange={onChange}
                              error={error?.message != undefined}
                            />
                        )}
                      />

                </Col>

                <Col xs={24} md={8}>
                  <TextField
                    style={{ marginBottom: 20, width: '100%' }}
                    label='Department'
                    variant="outlined"
                    onChange={value => console.log("Department value =", value)}
                    required
                  />
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
                  <TextField
                    style={{ marginBottom: 20, width: '100%' }}
                    label='Signed up'
                    variant="outlined"
                    onChange={value => console.log("Signed up value =", value)}
                    required
                  />
                </Col>


              </Row>


              {/* Save button  */}
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



