export type AmenityKey =
    | "balcony"
    | "attach"
    | "ac"
    | "tv"
    | "parking"
    | "wifi";

export interface AmenityItem {
    id: number;
    key: AmenityKey;
    label: string;
}

export interface RoomAmenities {
    common: AmenityItem[];
    optional: AmenityItem[];
}

export interface AmenityState {
    wifi: boolean;
    ac: boolean;
    tv: boolean;
    parking: boolean;
    [key: string]: boolean;
}

interface CreateRoomProps {
    roomName: string;
    roomOccupancy: string;
    amenities: AmenityState;
}

export interface RoomServiceProps {
    rooms: any[];
    total: number;
}


export interface RoomFormState {
    name: string;
    occupancy: string;
    balcony: boolean;
    attachedBathroom: boolean;
    amenities: string[];
};

export interface CreateRoomState {
    roomName: string;
    roomOccupancy: string;

    // Common amenities (direct booleans)
    balcony: boolean;
    attachedBathroom: boolean;

    // Optional amenities (badge based)
    amenities: AmenityState;
}
