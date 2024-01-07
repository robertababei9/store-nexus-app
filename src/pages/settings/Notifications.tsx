import { useState, useEffect } from 'react';
import { Switch, Tooltip } from 'antd';
import { Button } from 'src/components/_shared';

interface NotificationsState {
  [section: string]: { [action: string]: boolean };
}

export default function Notifications() {
  // Define a key to store the notifications state in browser storage
  const storageKey = 'notificationsState';

  const handleNotificationChange = (section: string, action: string) => {
    setNotifications((prevNotifications) => {
      const updatedNotifications = { ...prevNotifications };
      updatedNotifications[section][action] = !prevNotifications[section][action];
      return updatedNotifications;
    });
  };

  const [notifications, setNotifications] = useState<NotificationsState>(() => {
    // Retrieve the notifications state from browser storage or use the initial state
    const storedState = localStorage.getItem(storageKey);
    return storedState ? JSON.parse(storedState) : initialNotificationsState;
  });

  useEffect(() => {
    // Update browser storage when notifications state changes
    localStorage.setItem(storageKey, JSON.stringify(notifications));
  }, [notifications]);

  return (
    <div className="mx-4">
      <div className="space-y-4">
        {Object.entries(notifications).map(([section, actions], index) => (
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
                    size="small"
                    className="bg-gray-300"
                    checked={value}
                    onChange={() => handleNotificationChange(section, action)}
                  />
                  <Tooltip
                    placement="rightBottom"
                    title={getDescriptionForNotifications(action)}
                  >
                    <span className="flex p-1 cursor-pointer">{action}</span>
                  </Tooltip>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <Button
          type="secondary"
          className="flex justify-center items-center"
          onClick={saveNotificationsState}
        >
          Save Notifications
        </Button>
      </div>
    </div>
  );

  // Helper function to reset notifications to their initial state
  function resetNotifications() {
    setNotifications(initialNotificationsState);
    localStorage.removeItem(storageKey); // Clear the stored state
  }

  // Helper function to save notifications state
  function saveNotificationsState() {
    localStorage.setItem(storageKey, JSON.stringify(notifications));
    // You can also send the current state to the backend for permanent storage
    // Call an API to save the notifications state on your server
  }
}

// Initial state for notifications
const initialNotificationsState: NotificationsState = {
  'Business Performance': {
    'Monthly Sales Reports': false,
    'Profitability Insights': false,
    'Inventory Alerts': false,
  },
  'Operational Updates': {
    'Employee Activity': false,
    'Store Operations': false,
    'Compliance Updates': false,
    'Security Alerts': false,
  },
  'Customer and Employee Feedback': {
    'Customer Reviews': false,
    'Customer Complaints': false,
    'Employee Feedback': false,
  },
  'Expansion, Growth and Financial Updates': {
    'New Store Openings': false,
    'Investment Opportunities': false,
    'Financial Statements': false,
    'Tax Deadlines': false,
  },
};

function getDescriptionForNotifications(notification: string): string {
  const descriptions: { [key: string]: string } = {
    'Monthly Sales Reports': 'Keep track of sales and revenue performance across all stores',
    'Profitability Insights': 'Receive updates on the profitability of each store',
    'Inventory Alerts': 'Get notifications about low stock levels or potential shortages',
    'Employee Activity': 'Receive notifications about important employee activities or updates',
    'Store Operations': 'Stay informed about store opening/closing times and any operational changes',
    'Compliance Updates': 'Stay up to date with regulatory changes and compliance requirements',
    'Security Alerts': 'Be notified of any security breaches or unusual activity',
    'Customer Reviews': 'Get notifications about new customer reviews and feedback',
    'Customer Complaints': 'Be alerted to any customer complaints that require attention',
    'Employee Feedback': 'Receive feedback from employees regarding store operations',
    'New Store Openings': 'Receive updates on the launch of new stores or business expansion',
    'Investment Opportunities': 'Get notified about potential investment opportunities or partnerships',
    'Financial Statements': 'Receive financial statements and reports for each store',
    'Tax Deadlines': 'Be alerted to important tax deadlines and financial obligations',
  };

  return descriptions[notification] || 'No description available';
}

// ********** THIS WAS THE OLD CODE (new code, above one, will save the changes made about notification actions) *********** ///////////////

// import { useState } from 'react';
// import { Switch, Tooltip } from 'antd';
// import { Button } from 'src/components/_shared';


// interface NotificationsState {
//     [section: string]: { [action: string]: boolean };
// }

// export default function Notifications() {

//     const handleNotificationChange = (section: string, action: string) => {
//         setNotifications((prevNotifications) => {
//             const updatedNotifications = { ...prevNotifications };
//             updatedNotifications[section][action] = !prevNotifications[section][action];
//             return updatedNotifications;
//         });
//     };

//     const [notifications, setNotifications] = useState<NotificationsState>({
//         'Business Performance': {
//             'Monthly Sales Reports': false,
//             'Profitability Insights': false,
//             'Inventory Alerts': false,
//         },
//         'Operational Updates': {
//             'Employee Activity': false,
//             'Store Operations': false,
//             'Compliance Updates': false,
//             'Security Alerts': false,
//         },
//         'Customer and Employee Feedback': {
//             'Customer Reviews': false,
//             'Customer Complaints': false,
//             'Employee Feedback': false,
//         },
//         'Expansion, Growth and Financial Updates': {
//             'New Store Openings': false,
//             'Investment Opportunities': false,
//             'Financial Statements': false,
//             'Tax Deadlines': false,

//         },
//     });

//     return (
//         <div className="mx-4">
//             <div className="space-y-4">
//                 {Object.entries(notifications).map(([section, actions], index) => (
//                     <div key={section} className="mb-4">
//                         <div className="text-left text-gray-700 text-xl font-semibold">{section}</div>

//                         <hr className="w-[30%] border-gray-300 mb-2" />

//                         <div className="flex flex-col">
//                             {Object.entries(actions).map(([action, value]) => (
//                                 <div
//                                     key={`${section}-${action}`}
//                                     className="flex text-gray-700 items-center space-x-4"
//                                 >
//                                     <Switch
//                                         size='small'
//                                         className='bg-gray-300'
//                                         checked={value}
//                                         onChange={() => handleNotificationChange(section, action)}
//                                     />
//                                     <Tooltip placement='rightBottom'
//                                         title={getDescriptionForNotifications(action)}>
//                                         <span className="flex p-1 cursor-pointer">{action}</span>
//                                     </Tooltip>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ))}

//             </div>
//             <div className='mt-10'>
//                 <Button
//                     type='secondary'
//                     className='flex justify-center items-center'
//                 // onClick={() => navigate(ROUTES.AddUser)}
//                 >
//                     We need to save this application
//                 </Button>
//             </div>
//         </div>


//     );
// }

// function getDescriptionForNotifications(notification: string): string {
//     const descriptions: { [key: string]: string } = {
//         'Monthly Sales Reports': 'Keep track of sales and revenue performance across all stores',
//         'Profitability Insights': 'Receive updates on the profitability of each store',
//         'Inventory Alerts': 'Get notifications about low stock levels or potential shortages',
//         'Employee Activity': 'Receive notifications about important employee activities or updates',
//         'Store Operations': 'Stay informed about store opening/closing times and any operational changes',
//         'Compliance Updates': 'Stay up to date with regulatory changes and compliance requirements',
//         'Security Alerts': 'Be notified of any security breaches or unusual activity',
//         'Customer Reviews': 'Get notifications about new customer reviews and feedback',
//         'Customer Complaints': 'Be alerted to any customer complaints that require attention',
//         'Employee Feedback': 'Receive feedback from employees regarding store operations',
//         'New Store Openings': 'Receive updates on the launch of new stores or business expansion',
//         'Investment Opportunities': 'Get notified about potential investment opportunities or partnerships',
//         'Financial Statements': 'Receive financial statements and reports for each store',
//         'Tax Deadlines': 'Be alerted to important tax deadlines and financial obligations',
//     };

//     return descriptions[notification] || 'No description available';
// }

