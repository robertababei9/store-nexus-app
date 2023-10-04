export type LoginResponse = {
    token: string;
    needsToCreateCompany: boolean;
}

export type LoginFormValues = {
    Email:string;
    Password:string;
}