import { useState } from 'react';
import { Checkbox } from 'antd';

interface Permission {
  view: boolean;
  edit: boolean;
  create: boolean;
}

interface PermissionsState {
  dashboard: Permission;
  invoices: Permission;
  stores: Permission;
  users: Permission;
}

export default function Permissions() {
  const [permissions, setPermissions] = useState<PermissionsState>({
    dashboard: {
      view: false,
      edit: false,
      create: false,
    },
    invoices: {
      view: false,
      edit: false,
      create: false,
    },
    stores: {
      view: false,
      edit: false,
      create: false,
    },
    users: {
      view: false,
      edit: false,
      create: false,
    },
  });

  const handlePermissionChange = (section: keyof PermissionsState, action: keyof Permission) => {
    setPermissions((prevPermissions) => {
      const updatedPermissions = { ...prevPermissions };
      updatedPermissions[section][action] = !prevPermissions[section][action];
      return updatedPermissions;
    });
  };

  return (
    <div className="mx-4">
      <h1 className="text-2xl font-semibold mb-4">Gestionare permisiuni</h1>
      <div className="space-y-4">
        {Object.entries(permissions).map(([section, actions]) => (
          <div key={section as string}>
            <h2 className="text-lg font-semibold">{section}</h2>
            <div className="ml-4 space-y-2">
              {Object.entries(actions).map(([action, value]) => (
                <Checkbox
                  key={`${section}-${action}`}
                  
                >
                  {action}
                </Checkbox>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600">
        Salvează permisiuni
      </button>
    </div>
  );
}
