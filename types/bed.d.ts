export interface CreateBedPayload {
    roomId: string;
    bedNumber: string;
    tariff: string;
}

export interface Bed {
    _id: string;
    bedNumber: string;
    tariff: number;
    isOccupied: boolean;
    roomId: {
        _id: string;
        name: string;
        occupancy: number;
    };
}
