
export interface ErrorResponse {
    message: string;
    // Include other error properties if needed
}

export interface BookingItem {
    _id?: string
    userId?:string
    hotelId?:string
    user?: {
        name: string
        email: string
        tel: string
    }
    hotel?: {
        name: string
        address: string
        tel: string
    }
    bookingDate: string
    checkoutDate: string
}

export interface Hotel {
    id?: string
    name: string
    address: string
    district: string
    province: string
    postalcode: string
    tel: string
    picture: string
}

export interface getHospitalsResponse {
    success: boolean;
    count: number;
    pagination: object;
    data: Hotel[];
}

export interface getHospitalResponse {
    success: boolean;
    count: number;
    pagination: object;
    data: Hotel;
}

export interface getBookingsResponse {
    success: boolean;
    count: number;
    pagination: object;
    data: BookingItem[];
}

export interface getBookingResponse {
    success: boolean;
    count: number;
    pagination: object;
    data: BookingItem;
}