export class BaseDTO {
    data: TripData;
    metadata: Metadata;
}

export interface UserInfo {
    id: number;
    email: string;
    username: string;
}

export interface TripData {
    userId: number;
    latitudeStartLocation: number;
    longitudeStartLocation: number;
    latitudeEndLocation: number;
    longitudeEndLocation: number;
    date: string;
    startTime: string;
    endTime: string;
    seats: number;
    passengers: number[];
}

export interface Metadata {
    message: string;
    user: UserInfo
}
