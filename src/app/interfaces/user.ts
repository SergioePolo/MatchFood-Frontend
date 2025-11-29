export interface User {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    city: string;
    preferences: string;
    address: string;
    profilePicture?: string;
    userStatus?: boolean;
    role: string;
    createdAt?: string;  
}
