export type UserFormType = {
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
    PasswordConfirm: string;
    Contact: string;
    Country?: string;
    City?: string;
    StoreId: string;
    RoleId: string;
    SignUpDate: string;
}

export type SecurityFormType = {
    currentPass: string;
    newPass: string;
    repeatPass: string;
}

export type Role = {
    Id: string;
    Name: string;
    Description: string;
}

export type UserResponse = {
    Id: string;
    FirstName: string;
    LastName: string;
    Email: string;
    Role: string;
    RoleId: string;
    Country: string;
    City: string;
    Store: string;
    Contact: string;
    PhoneNumber: string;
    SignUpDate: string;
}