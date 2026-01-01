export interface RentDueResident {
    residentId: string;
    name: string;
    mobile: string;
    room: any;
    bed: any;
    rent: number;
}

export interface RentDueResponse {
    success: boolean;
    month: string;
    totalDue: number;
    data: RentDueResident[];
}
