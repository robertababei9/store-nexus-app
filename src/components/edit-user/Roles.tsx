import React, { useState } from 'react';
import { Row, Col, Card, Checkbox } from 'antd';
import { Button } from '../_shared';

// Define a type for roles
type Role = 'Admin' | 'Manager' | 'User';

// Define a type for permissions
interface Permissions {
    canViewDashboard: boolean;
    canManageProducts: boolean;
    canPlaceOrders: boolean;
    // Add more permissions as needed
}

interface RolesUserPageProps {
    // Add any props you need here
}

export default function RolesUserPage(props: RolesUserPageProps) {
    const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);
    const [rolePermissions, setRolePermissions] = useState<Permissions>({
        canViewDashboard: false,
        canManageProducts: false,
        canPlaceOrders: false,
        // Initialize other permissions as needed
    });

    // Function to handle role selection
    const handleRoleChange = (role: Role) => {
        if (selectedRoles.includes(role)) {
            setSelectedRoles(selectedRoles.filter((r) => r !== role));
        } else {
            setSelectedRoles([...selectedRoles, role]);
        }
    };

    // Function to save selected roles and permissions
    const saveRolesAndPermissions = () => {
        // Implement the logic to save the roles and permissions based on selectedRoles and rolePermissions
    };

    return (
        <div className='mx-4'>
            <Row gutter={16}>
                <Col xs={24} md={14}>
                    <Card
                        title={<div className="text-left font-semibold">Manage User Roles</div>}
                        className='w-full mb-4 hover:shadow-[0_5px_15px_0_rgba(0,0,0,0.07)]'
                    >
                        <div className='text-left text-lg'>
                            <div>
                                <h2>Select Roles:</h2>
                                <Checkbox
                                    onChange={() => handleRoleChange('Admin')}
                                    checked={selectedRoles.includes('Admin')}
                                >
                                    Admin
                                </Checkbox>
                                <Checkbox
                                    onChange={() => handleRoleChange('Manager')}
                                    checked={selectedRoles.includes('Manager')}
                                >
                                    Manager
                                </Checkbox>
                                <Checkbox
                                    onChange={() => handleRoleChange('User')}
                                    checked={selectedRoles.includes('User')}
                                >
                                    User
                                </Checkbox>
                            </div>
                            {/* Define permissions for selected roles */}
                            {selectedRoles.length > 0 && (
                                <div>
                                    <h2>Define Permissions:</h2>
                                    <div>
                                        <Checkbox
                                            onChange={(e) =>
                                                setRolePermissions({
                                                    ...rolePermissions,
                                                    canViewDashboard: e.target.checked,
                                                })
                                            }
                                            checked={rolePermissions.canViewDashboard || false}
                                        >
                                            Can View Dashboard
                                        </Checkbox>
                                    </div>
                                    <div>
                                        <Checkbox
                                            onChange={(e) =>
                                                setRolePermissions({
                                                    ...rolePermissions,
                                                    canManageProducts: e.target.checked,
                                                })
                                            }
                                            checked={rolePermissions.canManageProducts || false}
                                        >
                                            Can Manage Products
                                        </Checkbox>
                                    </div>
                                    <div>
                                        <Checkbox
                                            onChange={(e) =>
                                                setRolePermissions({
                                                    ...rolePermissions,
                                                    canPlaceOrders: e.target.checked,
                                                })
                                            }
                                            checked={rolePermissions.canPlaceOrders || false}
                                        >
                                            Can Place Orders
                                        </Checkbox>
                                    </div>
                                    {/* Add more permissions here */}
                                </div>
                            )}
                            <div className="mt-4">
                                <Button type="secondary" onClick={saveRolesAndPermissions}>
                                    Save Roles and Permissions
                                </Button>
                            </div>
                        </div>
                    </Card>
                    <div className="">
                        <span className="text-purple-500 bg-purple-200 bg-round">Admin</span>
                    </div>

                    <div className="text-white text-xs inline-block font-semibold py-1 px-2 rounded-full uppercase">
                        <span className="bg-blue-500">Manager</span>
                    </div>

                    <div className="text-white text-xs inline-block font-semibold py-1 px-2 rounded-full uppercase">
                        <span className="bg-green-500">User</span>
                    </div>


                </ Col>
            </Row>
        </div>

    );
}