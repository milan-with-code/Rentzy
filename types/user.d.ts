import { Property } from "./property";

export interface UserDataProps {
    _id: string;
    name: string;
    email: string;
    phone: string;
    property: string | null;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    property?: Property | null;
    createdAt?: string;
    updatedAt?: string;
}

export interface UpdateUserPayload {
    pgName?: string;
    phone?: string;
    address?: string;
    gstin?: string;
    expiry?: string;
    upiName?: string;
    upiId?: string;
    logoImage?: string | null;
    qrCodeImage?: string | null;
    signatureImage?: string | null;
}
