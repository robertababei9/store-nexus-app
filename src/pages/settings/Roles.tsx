import { useEffect, useState } from 'react';
import { Checkbox, Col, Row, Switch, Tooltip } from 'antd';
import { Button, Dropdown } from 'src/components/_shared';
import { OptionType } from 'src/types/_shared';
import { getDefaultApiUrl } from 'src/config';
import axios from 'axios';
import { Role } from 'src/types/users';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ROUTES } from 'src/utils/Constants';

type RolesFormType = {
    role: string;

    // permissions
    ViewDashboard: boolean;
    EditDashboard: boolean;


}

interface PermissionsState {
    [section: string]: { [action: string]: string };
}

type PermissionRowType = {
    title: string;
}
const PermissionRow = ({
    title,
}: PermissionRowType) => {
    return (
        <div>

        </div>
    )
}

export default function Roles() {

    // states
    const [roleOptions, setRoleOptions] = useState<OptionType[]>([])
    const [roleOptionsLoading, setRoleOptionsLoading] = useState<boolean>(true);
    const [selectedRole, setSelectedRole] = useState<string>(''); // Stocăm rolul selectat

    // form
    const methods = useForm<RolesFormType>();
    methods.watch("role");

    // effects
    useEffect(() => {
        fetchRoles();
    }, []);


    const handleRoleChange = (value: string) => {
        setSelectedRole(value);
    };

    // helpers
    const fetchRoles = async () => {
        try {
            const result = await axios.get<Role[]>(getDefaultApiUrl() + "/api/users/GetUserRoles", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });

            if (result.data) {
                const roleOptions: OptionType[] = result.data.map(x => ({ value: x.Id, label: x.Name }));
                setRoleOptions(roleOptions);
            }
        }
        catch (error: any) {
            console.log("Error while trying to get the Roles", error);
        }
        finally {
            setRoleOptionsLoading(false);
        }
    }

    const fetchRolePermissions = async (roleId: string) => {
        try {
            // ["ViewDashboard", ... ]
            const result = await axios.get<string[]>(getDefaultApiUrl() + `/api/settings/GetRolePermissions${roleId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });

            if (result.data) {
                const rolePermissions = result.data;
                // methods.reset(rolePermissions);
            }
        }
        catch (error: any) {
            console.log("Error while trying to get the Roles", error);
        }
        finally {
            setRoleOptionsLoading(false);
        }
    }

    const handlePermissionChange = (section: string, action: string) => {
        setPermissions((prevPermissions) => {
            const updatedPermissions = { ...prevPermissions };
            // updatedPermissions[section][action] = !prevPermissions[section][action];
            return updatedPermissions;
        });
    };


    const [permissions, setPermissions] = useState<PermissionsState>({
        'Dashboard Permissions': {
            // "ViewDashboard": "View Dashboard",


            'View Dashboard': "ViewDashboard",
            'Edit dashboards': "EditDashboard",
        },
        'Store Management': {
            'View stores': "ViewStore",
            'Edit stores': "EditStore",
            'Add stores': "CreateStore",
            'Delete stores': "DeleteStore",
        },
        'Invoice Actions': {
            'View invoices': "ViewInvoice",
            'Create invoices': "CreateInvoice",
        },
        'User Management': {
            'View users': "ViewUser",
            'Edit users': "EditUser",
            'Add users': "CreateUser",
            'Delete user': "DeleteUser"
        },
    });

    return (
        <div className="mx-4">
            <div className="flex flex-col items-start mb-4">
                <h1 className="text-left text-gray-700 text-xl font-semibold mb-3">Employee type</h1>
                <div className='w-[30%]'>
                    <Controller
                        name={`role`}
                        control={methods.control}
                        rules={{
                            required: false
                        }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <Dropdown
                                placeholder='Select Role'
                                options={roleOptions}
                                defaultValue={value}
                                onChange={() => {
                                    onChange();
                                    fetchRolePermissions(value);
                                }}
                                error={error?.message != undefined}
                            />
                        )}
                    />
                    <div className='text-left text-xs text-gray-500'>
                        To assign a role to an employee, please refer to
                        <Link className='font-semibold text-blue-500' to={ROUTES.Users}> Users page</Link>
                    </div>

                </div>
            </div>
            <div className="space-y-4">
                <div className="mb-4">
                            <div className="text-left text-gray-700 text-xl font-semibold">Dashboard Permissions</div>

                            <hr className="w-[30%] border-gray-300 mb-2" />

                            <div className="flex flex-col">
                                {/* copii lui Dashboard */}
                                <PermissionRow title="View Dashboard" />
                                <PermissionRow title="Edit Dashboard"/>
                                
                            </div>
                </div>

                <div className="mb-4">
                            <div className="text-left text-gray-700 text-xl font-semibold">Dashboard Permissions</div>

                            <hr className="w-[30%] border-gray-300 mb-2" />

                            <div className="flex flex-col">
                                {/* copii lui Dashboard */}
                                <PermissionRow title="View Dashboard"/>
                                <PermissionRow title="Edit Dashboard"/>
                                
                            </div>
                </div>

                <div className="mb-4">
                            <div className="text-left text-gray-700 text-xl font-semibold">Dashboard Permissions</div>

                            <hr className="w-[30%] border-gray-300 mb-2" />

                            <div className="flex flex-col">
                                {/* copii lui Dashboard */}
                                <PermissionRow title="View Dashboard"/>
                                <PermissionRow title="Edit Dashboard"/>
                                
                            </div>
                </div>

                <div className="mb-4">
                            <div className="text-left text-gray-700 text-xl font-semibold">Dashboard Permissions</div>

                            <hr className="w-[30%] border-gray-300 mb-2" />

                            <div className="flex flex-col">
                                {/* copii lui Dashboard */}
                                <PermissionRow title="View Dashboard"/>
                                <PermissionRow title="Edit Dashboard"/>
                                
                            </div>
                </div>
            </div>
            {/* <div className="space-y-4">

                {Object.entries(permissions).map(([section, actions], index) => (
                    <div key={section} className="mb-4">
                        <div className="text-left text-gray-700 text-xl font-semibold">{section}</div>

                        <hr className="w-[30%] border-gray-300 mb-2" />

                        <div className="flex flex-col">
                            {Object.entries(actions).map(([action, value]) => (
                                <div
                                    key={`${section}-${action}`}
                                    className="flex text-gray-700 items-center space-x-4"
                                >
                                    <Controller
                                        name={}
                                        control={methods.control}
                                        rules={{
                                            required: false
                                        }}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => (
                                            <Switch
                                                size='small'
                                                className='bg-gray-300'
                                                checked={value}
                                                onChange={() => handlePermissionChange(section, action)}
                                            />
                                        )}
                                    />

                                    <Tooltip placement='rightBottom'
                                        title={getDescriptionForPermission(action)}>
                                        <span className="flex p-1 cursor-pointer">{action}</span>
                                    </Tooltip>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

            </div> */}
            <div className='mt-10'>
                <Button
                    type='secondary'
                    className='flex justify-center items-center'
                    onClick={handleRoleChange}
                >
                    We need to save this application
                </Button>
            </div>
        </div>


    );
}

function getDescriptionForPermission(permission: string): string {
    const descriptions: { [key: string]: string } = {
        'View Dashboard': 'Allows users to access and view the dashboard page',
        'Edit dashboards': 'Grants the ability to modify the layout and content of the dashboard',
        'Create dashboards': 'Allows users to create new dashboards',
        'Delete dashboards': 'Allows users to delete dashboards',
        'View stores': 'Allows users to access and view the store management',
        'Edit stores': 'Grants the ability to modify store information',
        'Add stores': 'Allows users to add new stores',
        'Delete stores': 'Allows users to delete stores',
        'View invoices': 'Allows users to access and view invoices',
        'Create invoices': 'Allows users to create new invoices',
        'View users': 'Allows users to access and view user management',
        'Edit users': 'Grants the ability to modify user information',
        'Add users': 'Allows users to add new users',
    };

    return descriptions[permission] || 'No description available';
}

// TO BE DONE: (cred ca doar prin backend se poate)
// sa fie permisiuni prestabilite pentru fiecare rol
// adica ADMIN sa aiba full access / MANAGER sa aiba vr 80% / USER sa aiba cateva
// adica cand schimbi ROLUL din ADMIN in USER sa se schimbe si permisiunile (checkbox-urile)
// si la fel, cand dai pe butonul de save, daca vrei sa mai bagi o permisiune noua pt USER, sa ramana salvat si in backend (plus ca trb sa te intrebe de 2 ori daca vrei sigur sa salvezi)