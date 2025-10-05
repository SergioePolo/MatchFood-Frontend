export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    city: string;
    categories?: string;
    address: string;
    profilePicture?: string;
    role: string
}
