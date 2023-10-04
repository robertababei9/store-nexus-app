export type UserFormType = {
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
    PasswordConfirm: string;
    PhoneNumber: string;
    Country?: string;
    City?: string;
    StoreId: string;
    RoleId: string;
    SignUpDate: string;
}

export type SecurityFormType = {
    CurrentPassword: string;
    NewPassword: string;
    ConfirmNewPassword: string;
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

export type ChangePasswordRequest = {
    UserId: string;
    CurrentPassword?: string;
    NewPassword: string;
    ConfirmNewPassword: string;
}