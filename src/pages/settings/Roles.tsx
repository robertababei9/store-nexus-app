import { useEffect, useState } from 'react';
import { Checkbox, Switch, Tooltip } from 'antd';
import { Button, Dropdown } from 'src/components/_shared';
import { OptionType } from 'src/types/_shared';
import { getDefaultApiUrl } from 'src/config';
import axios from 'axios';
import { Role } from 'src/types/users';

interface PermissionsState {
    [section: string]: { [action: string]: boolean };
}

export default function Roles() {

    // states
    const [roleOptions, setRoleOptions] = useState<OptionType[]>([])
    const [roleOptionsLoading, setRoleOptionsLoading] = useState<boolean>(true);
    const [selectedRole, setSelectedRole] = useState<string>(''); // Stocăm rolul selectat


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
            console.log("Error while trying to get the Roles");
        }
        finally {
            setRoleOptionsLoading(false);
        }


    }

    const handlePermissionChange = (section: string, action: string) => {
        setPermissions((prevPermissions) => {
            const updatedPermissions = { ...prevPermissions };
            updatedPermissions[section][action] = !prevPermissions[section][action];
            return updatedPermissions;
        });
    };

    const [permissions, setPermissions] = useState<PermissionsState>({
        'Dashboard Permissions': {
            'View Dashboard': false,
            'Edit dashboards': false,
            'Create dashboards': false,
            'Delete dashboards': false,
        },
        'Store Management': {
            'View stores': false,
            'Edit stores': false,
            'Add stores': false,
            'Delete stores': false,
        },
        'Invoice Actions': {
            'View invoices': false,
            'Create invoices': false,
        },
        'User Management': {
            'View users': false,
            'Edit users': false,
            'Add users': false,
        },
    });

    return (
        <div className="mx-4">
            <div className="flex items-center space-x-4 mb-4"> {/* Utilizăm flex pentru aliniere */}
                <h1 className="text-left text-2xl font-semibold">Select role:</h1>
               <div className='w-[50%]'>

                <Dropdown
                    placeholder="Select Role *"
                    options={roleOptions}
                    // value={selectedRole}
                    onChange={handleRoleChange}
                    defaultValue={selectedRole}
                    />
                    ce cct e asta, nu mi place deloc, e prea gol, arata urat
                    </div>
            </div>
            <div className="space-y-4">
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
                                    <Switch
                                        size='small'
                                        className='bg-gray-300'
                                        checked={value}
                                        onChange={() => handlePermissionChange(section, action)}
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

            </div>
            <div className='mt-10'>
                <Button
                    type='secondary'
                    className='flex justify-center items-center'
                // onClick={() => navigate(ROUTES.AddUser)}
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

