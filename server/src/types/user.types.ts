export interface IUser {
    name?: string;
    email: string;
    password: string;
    isVerified?: boolean;
    role: string;
    verficationToken?: string;
    isFirstLogin?: boolean;
}

type userReqBody = {
    name: string;
    email: string;
    password: string;
};

export type UserRequest = {
    body: userReqBody;
};

export type UserResponseError = {
    success: false;
    message: string;
    errorCode?: string | number;
};
export type UserResponseSuccess = {
    success: boolean;
    status: number;
    message: string;
    data?: any;
};
