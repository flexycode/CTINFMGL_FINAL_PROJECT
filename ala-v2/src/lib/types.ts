export type FlightStatus = 'AVAILABLE' | 'FULL' | 'CANCELLED';
export type SeatClass = 'ECONOMY' | 'PREMIUM ECONOMY' | 'BUSINESS' | 'FIRST';
export type SeatStatus = 'AVAILABLE' | 'BOOKED';

export interface Flight {
    id: number;
    departure_city: string;
    arrival_city: string;
    flight_date: string;
    duration_hours: number;
    base_price: number;
    flight_status: FlightStatus;
    created_at?: string;
}

export interface Profile {
    id: string;
    username: string;
    role: 'admin' | 'user';
    email: string;
    phone_number?: string;
    created_at?: string;
}

export interface Seat {
    id: number;
    flight_id: number;
    seat_number: string;
    class: SeatClass;
    status: SeatStatus;
    price: number;
}
