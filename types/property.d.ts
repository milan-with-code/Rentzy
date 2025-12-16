export interface PropertyData {
    _id: string;

    propertyName: string;
    ownerName: string;
    email: string;

    pinCode: string;
    state: string;
    city: string;
    address: string;

    whoCanStay: "Boys" | "Girls" | "Co-living";

    idealFor: string[];

    registrationFor: string;

    totalRooms: number;
    occupiedRooms: number;
    vacantRooms: number;

    occupancyTypes: string[];
    amenities: string[];

    agreementDuration: string;
    securityDeposit: string;
    noticePeriod: string;

    securityFeatures: {
        cctv: boolean;
        biometricAccess: boolean;
        securityGuard: boolean;
    };

    createdBy: string;
}
