import { useEffect, useState } from 'react';
import { Switch, Tooltip } from 'antd';
import { Button, Dropdown } from 'src/components/_shared';
import { ApiResponseModel, OptionType } from 'src/types/_shared';
import { getDefaultApiUrl } from 'src/config';
import axios from 'axios';
import { Role } from 'src/types/users';
import { Control, Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ROUTES } from 'src/utils/Constants';
import CreateRoleModal from 'src/components/settings/roles/CreateRoleModal';
import { PlusOutlined } from '@ant-design/icons';
import { SaveRolePermissionsRequest } from 'src/types/permissions';
import { openNotification } from 'src/utils/Notification';

type RolesFormType = {
    roleId: string;

    // permissions
    ViewDashboard: boolean;
    EditDashboard: boolean;

    ViewStore: boolean;
    EditStore: boolean;
    CreateStore: boolean;
    DeleteStore: boolean;

    ViewInvoice: boolean;
    CreateInvoice: boolean;

    ViewUser: boolean;
    EditUser: boolean;
    CreateUser: boolean;
    DeleteUser: boolean;

    Settings: boolean;
}

interface PermissionsState {
    [section: string]: { [action: string]: string };
}

type PermissionRowType = {
    name: "ViewDashboard" | "EditDashboard" | "ViewStore" | "EditStore" | "CreateStore" | "DeleteStore" | "ViewInvoice" | "CreateInvoice" | "ViewUser" | "EditUser" | "CreateUser" | "DeleteUser" | "Settings";
    title: string;
    control: Control<RolesFormType, any>;
}
const PermissionRow = ({
    name, title, control,
}: PermissionRowType) => {
    return (
        <div>
            <div className="flex text-gray-700 items-center space-x-4">
                <Controller
                    name={name}
                    control={control}
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
                            onChange={onChange}
                        />
                    )}
                />
                <Tooltip placement='rightBottom'
                    title={getDescriptionForPermission(name)}
                >
                    <span className="flex cursor-pointer">{title}</span>
                </Tooltip>
            </div>
        </div>
    )
}

export default function Roles() {

    // states
    const [roleOptions, setRoleOptions] = useState<OptionType[]>([])
    const [roleOptionsLoading, setRoleOptionsLoading] = useState<boolean>(true);
    const [CreateRoleModalOpen, setCreateRoleModalOpen] = useState<boolean>(false);

    // form
    const methods = useForm<RolesFormType>();
    const x = methods.control
    methods.watch("roleId");

    // effects
    useEffect(() => {
        fetchRoles();
    }, []);

    // handlers

    const SaveRolePermissions = async () => {

        try {
            // destructuring + spread operator
            const { 
                roleId,
                 ...rolePermissions
            } = methods.getValues();


            const body: SaveRolePermissionsRequest = {
                rolePermissions: rolePermissions
            };

            const result = await axios.post<ApiResponseModel>(getDefaultApiUrl() + `/api/settings/SaveRolePermissions/${roleId}`,
                body,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        'Content-Type': 'application/json'
                    },
                });

            if (result.data.Success) {
                openNotification("success", "Success", "Permissions saved successfully")
            }
        }
        catch (err: any) {
            console.log(err);
            openNotification("error");
        }
    }

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
            const result = await axios.get<ApiResponseModel>(getDefaultApiUrl() + `/api/settings/GetRolePermissions/${roleId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });

            // console.log("result =", result)

            if (result.data) {
                const { Data } = result.data
                const mappedData = Object.fromEntries(Data.map((field: string) => [field, true]))
                // console.log("mapData=", mappedData)
                methods.reset({
                    ...mappedData,
                    roleId: methods.getValues("roleId")
                })
            }
        }
        catch (error: any) {
            console.log("Error while trying to get the Roles", error);
        }
        finally {
            setRoleOptionsLoading(false);
        }
    }

    // I think this const it's not necessary. So we can delete it when we merge to main!
    const [permissions, setPermissions] = useState<PermissionsState>({
        'Dashboard Permissions': {
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

    console.log(methods.getValues())

    return (
        <div className="mx-4 relative">
            <div className="flex flex-col items-start mb-4">
                <div className="w-full">
                    <h1 className="text-left text-gray-700 text-xl font-semibold mb-3">Employee type</h1>
                    <div className='w-[30%]'>
                        <Controller
                            name={`roleId`}
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
                                    onChange={(event) => {
                                        onChange(event);
                                        fetchRolePermissions(event.target.value);
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

                <div className="absolute top-0 right-0 mt-4 mr-4">
                    <Button
                        type='secondary'
                        className='flex justify-center items-center'
                        onClick={() => setCreateRoleModalOpen(true)}
                        icon={<PlusOutlined />}
                    >
                        Create Role
                    </Button>
                </div>
            </div>

            {/* PERMISSIONS */}
            <div className="space-y-4">
                <div className="mb-4">
                    <div className="text-left text-gray-700 text-xl font-semibold">Dashboard Permissions</div>
                    <hr className="w-[30%] border-gray-300 mb-2" />
                    <div className="flex flex-col">
                        {/* copii lui Dashboard */}
                        <PermissionRow control={methods.control} name="ViewDashboard" title="View Dashboard" />
                        <PermissionRow control={methods.control} name="EditDashboard" title="Edit Dashboard" />
                    </div>
                </div>

                <div className="mb-4">
                    <div className="text-left text-gray-700 text-xl font-semibold">Store Management</div>
                    <hr className="w-[30%] border-gray-300 mb-2" />
                    <div className="flex flex-col">
                        <PermissionRow control={methods.control} name="ViewStore" title="View stores" />
                        <PermissionRow control={methods.control} name="EditStore" title="Edit Store" />
                        <PermissionRow control={methods.control} name="CreateStore" title="Create Store" />
                        <PermissionRow control={methods.control} name="DeleteStore" title="Delete Store" />
                    </div>
                </div>

                <div className="mb-4">
                    <div className="text-left text-gray-700 text-xl font-semibold">Invoice Actions</div>
                    <hr className="w-[30%] border-gray-300 mb-2" />
                    <div className="flex flex-col">
                        <PermissionRow control={methods.control} name="ViewInvoice" title="View Invoice" />
                        <PermissionRow control={methods.control} name="CreateInvoice" title="Create Invoice" />
                    </div>
                </div>

                <div className="mb-4">
                    <div className="text-left text-gray-700 text-xl font-semibold">User Management</div>
                    <hr className="w-[30%] border-gray-300 mb-2" />
                    <div className="flex flex-col">
                        <PermissionRow control={methods.control} name="ViewUser" title="View User" />
                        <PermissionRow control={methods.control} name="EditUser" title="Edit User" />
                        <PermissionRow control={methods.control} name="CreateUser" title="Create User" />
                        <PermissionRow control={methods.control} name="DeleteUser" title="Delete User" />
                    </div>
                </div>
                <div className="mb-4">
                    <div className="text-left text-gray-700 text-xl font-semibold">Settings</div>
                    <hr className="w-[30%] border-gray-300 mb-2" />
                    <div className="flex flex-col">
                        <PermissionRow control={methods.control} name="Settings" title="Settings" />
                    </div>
                </div>
            </div>

            <div className='mt-10'>
                <Button
                    type='secondary'
                    className='flex justify-center items-center'
                    onClick={SaveRolePermissions}
                >
                    Save Changes
                </Button>
            </div>

            <CreateRoleModal
                isOpen={CreateRoleModalOpen}
                onClose={() => setCreateRoleModalOpen(false)}
                onCreateCompleted={
                    (roleName) => {
                        // console.log("roleName = ", roleName);
                        // Manager / Admin / User
                        // ---> Super Admin 1
                        // spread operator
                        setRoleOptions([...roleOptions, { value: "id-from-backend", label: roleName }]);
                        methods.setValue("roleId", "id-from-backend");
                    }
                }
            />
        </div>



    );
}

function getDescriptionForPermission(permission: string): string {
    const descriptions: { [key: string]: string } = {
        'ViewDashboard': 'Allows users to access and view the dashboard page',
        'EditDashboard': 'Grants the ability to modify the layout and content of the dashboard',
        // 'Create dashboards': 'Allows users to create new dashboards',
        // 'Delete dashboards': 'Allows users to delete dashboards',

        'ViewStore': 'Allows users to access and view the store management',
        'EditStore': 'Grants the ability to modify store information',
        'CreateStore': 'Allows users to add new stores',
        'DeleteStore': 'Allows users to delete stores',

        'ViewInvoice': 'Allows users to access and view invoices',
        'CreateInvoice': 'Allows users to create new invoices',

        'ViewUser': 'Allows users to access and view user management',
        'EditUser': 'Grants the ability to modify user information',
        'CreateUser': 'Allows users to add new users',
        'DeleteUser': 'Allows users to delete users',

        'Settings': 'Allows users to access and modify application settings',
    };

    return descriptions[permission] || 'No description available';
}