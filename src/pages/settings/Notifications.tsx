import { useState } from 'react';
import { Switch } from 'antd';
import { Button } from 'src/components/_shared';


interface PermissionsState {
    [section: string]: { [action: string]: boolean };
}

export default function Notifications() {

    const handlePermissionChange = (section: string, action: string) => {
        setPermissions((prevPermissions) => {
            const updatedPermissions = { ...prevPermissions };
            updatedPermissions[section][action] = !prevPermissions[section][action];
            return updatedPermissions;
        });
    };

    const [permissions, setPermissions] = useState<PermissionsState>({
        'Business Performance': {
            'Monthly Sales Reports: Keep track of sales and revenue performance across all stores.': false,
            'Profitability Insights: Receive updates on the profitability of each store.': false,
            'Inventory Alerts: Get notifications about low stock levels or potential shortages.': false,
        },
        'Operational Updates': {
            'Employee Activity: Receive notifications about important employee activities or updates.': false,
            'Store Operations: Stay informed about store opening/closing times and any operational changes.': false,
            'Compliance Updates: Stay up to date with regulatory changes and compliance requirements.': false,
            'Security Alerts: Be notified of any security breaches or unusual activity.': false,
        },
        'Customer and Employee Feedback': {
            'Customer Reviews: Get notifications about new customer reviews and feedback.': false,
            'Customer Complaints: Be alerted to any customer complaints that require attention.': false,
            'Employee Feedback: Receive feedback from employees regarding store operations.': false,
        },
        'Expansion, Growth and Financial Updates': {
            'New Store Openings: Receive updates on the launch of new stores or business expansion.': false,
            'Investment Opportunities: Get notified about potential investment opportunities or partnerships.': false,
            'Financial Statements: Receive financial statements and reports for each store.': false,
            'Tax Deadlines: Be alerted to important tax deadlines and financial obligations.': false,

        },
    });

    return (
        <div className="mx-4">
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
                                    <span className="flex p-1 cursor-pointer">{action}</span>
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
