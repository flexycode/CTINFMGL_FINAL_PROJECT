import { supabase } from './supabase';
import { Flight } from './types';

export const getFlights = async (): Promise<Flight[]> => {
    const { data, error } = await supabase
        .from('flights')
        .select('*')
        .order('flight_date', { ascending: true });

    if (error) {
        console.error('Error fetching flights:', error);
        return [];
    }

    return data as Flight[];
};

export const searchFlights = async (origin: string, destination: string, date?: string): Promise<Flight[]> => {
    let query = supabase
        .from('flights')
        .select('*')
        .ilike('departure_city', `%${origin}%`)
        .ilike('arrival_city', `%${destination}%`);

    if (date) {
        query = query.eq('flight_date', date);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error searching flights:', error);
        return [];
    }

    return data as Flight[];
};

export const getFlightById = async (id: string): Promise<any | null> => {
    const { data, error } = await supabase
        .from('flights')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching flight:', error);
        return null;
    }
    return data;
};

export const getSeats = async (flightId: string): Promise<any[]> => {
    const { data, error } = await supabase
        .from('seats')
        .select('*')
        .eq('flight_id', flightId);

    if (error) {
        console.error('Error fetching seats:', error);
        return [];
    }
    return data || [];
};

export const addToCart = async (flightId: number, userId: string, seatId: number): Promise<boolean> => {
    const { error } = await supabase
        .from('carts')
        .insert([{ flight_id: flightId, user_id: userId, seat_id: seatId }]);

    if (error) {
        console.error('Error adding to cart:', error);
        return false;
    }
    return true;
};

export const getCartItems = async (userId: string): Promise<any[]> => {
    const { data, error } = await supabase
        .from('carts')
        .select(`
            *,
            flight:flights(*),
            seat:seats(*)
        `)
        .eq('user_id', userId);

    if (error) {
        console.error('Error fetching cart items:', error);
        return [];
    }
    return data || [];
};

export async function removeFromCart(cartId: number) {
    const { error } = await supabase
        .from("carts")
        .delete()
        .eq("id", cartId);
    return !error;
}

export async function clearCart(userId: string) {
    const { error } = await supabase
        .from("carts")
        .delete()
        .eq("user_id", userId);
    return !error;
}

export async function createBooking(userId: string, flightId: number, seatId: number) {
    const { data, error } = await supabase
        .from("bookings")
        .insert([{ user_id: userId, flight_id: flightId, seat_id: seatId }])
        .select();
    return { data, error };
}

export async function getBookings(userId: string) {
    const { data, error } = await supabase
        .from("bookings")
        .select(`
      *,
      flight:flights(*),
      seat:seats(*)
    `)
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
    return data || [];
}
