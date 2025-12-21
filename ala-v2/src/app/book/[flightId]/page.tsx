"use client";

import { useEffect, useState, use } from "react";
import { getFlightById, getSeats, addToCart } from "@/lib/services";
import { Flight, Seat } from "@/lib/types";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Plane, ChevronLeft, User, CheckCircle2, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BookPage({ params }: { params: Promise<{ flightId: string }> }) {
    const { flightId } = use(params);
    const [flight, setFlight] = useState<Flight | null>(null);
    const [seats, setSeats] = useState<Seat[]>([]);
    const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [cartLoading, setCartLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/signin?message=Please sign in to book a flight");
                return;
            }
            setUser(user);

            const flightData = await getFlightById(flightId);
            const seatsData = await getSeats(flightId);
            setFlight(flightData);
            setSeats(seatsData);
            setLoading(false);
        };
        fetchData();
    }, [flightId, router]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!flight) return <div className="min-h-screen flex items-center justify-center">Flight not found</div>;

    const handleSeatClick = (seat: Seat) => {
        if (seat.status === 'AVAILABLE') {
            setSelectedSeat(seat);
        }
    };

    const handleAddToCart = async () => {
        if (!user || !flight || !selectedSeat) return;

        setCartLoading(true);
        const success = await addToCart(Number(flightId), user.id, selectedSeat.id);
        if (success) {
            router.push("/cart");
        } else {
            alert("Failed to add to cart. Please try again.");
            setCartLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 p-6 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/flights" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                            <ChevronLeft className="w-5 h-5 text-slate-600" />
                        </Link>
                        <div>
                            <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
                                Seat Selection
                            </h1>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                                {flight.departure_city} to {flight.arrival_city} • {new Date(flight.flight_date).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Total Price</p>
                            <p className="text-xl font-black text-blue-600">₱{selectedSeat ? (Number(flight.base_price) + Number(selectedSeat.price)).toLocaleString() : Number(flight.base_price).toLocaleString()}</p>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            disabled={!selectedSeat || cartLoading}
                            className="bg-blue-600 disabled:bg-slate-300 text-white font-black px-8 py-3 rounded-xl shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase text-xs tracking-widest flex items-center gap-2"
                        >
                            {cartLoading ? "Adding..." : "Add to Cart"}
                            <ShoppingCart className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-7xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Plane View */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-12 overflow-x-auto">
                    <div className="max-w-md mx-auto">
                        <div className="relative border-x-4 border-t-[40px] border-slate-100 rounded-t-[100px] pt-12 pb-24 px-8 min-h-[600px]">
                            <div className="flex justify-between items-center mb-12 opacity-50">
                                <div className="w-8 h-4 bg-slate-200 rounded-full" />
                                <Plane className="w-6 h-6 text-slate-300 rotate-45" />
                                <div className="w-8 h-4 bg-slate-200 rounded-full" />
                            </div>

                            <div className="grid grid-cols-4 gap-4">
                                {seats.map((seat) => (
                                    <motion.button
                                        key={seat.id}
                                        whileHover={seat.status === 'AVAILABLE' ? { scale: 1.1 } : {}}
                                        whileTap={seat.status === 'AVAILABLE' ? { scale: 0.95 } : {}}
                                        onClick={() => handleSeatClick(seat)}
                                        className={`
                        h-12 rounded-lg border-2 font-bold text-xs transition-all flex items-center justify-center
                        ${seat.status === 'BOOKED'
                                                ? 'bg-slate-100 border-slate-100 text-slate-300 cursor-not-allowed'
                                                : selectedSeat?.id === seat.id
                                                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30'
                                                    : 'bg-white border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600'
                                            }
                      `}
                                    >
                                        {seat.seat_number}
                                    </motion.button>
                                ))}
                            </div>

                            <div className="mt-20 border-b-2 border-slate-50 border-dashed" />
                        </div>
                    </div>
                </div>

                {/* Legend & Details */}
                <aside className="space-y-8">
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6">
                        <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm border-b border-slate-50 pb-4">Legend</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-md bg-white border-2 border-slate-200" />
                                <span className="text-sm font-bold text-slate-500">Available</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-md bg-blue-600" />
                                <span className="text-sm font-bold text-slate-500">Selected</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-md bg-slate-100" />
                                <span className="text-sm font-bold text-slate-500">Booked</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-3xl text-white p-8 space-y-6">
                        <h3 className="font-black uppercase tracking-widest text-sm border-b border-white/10 pb-4">Flight Summary</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-slate-400 font-bold uppercase text-[10px]">Route</span>
                                <span className="font-bold">{flight.departure_city} → {flight.arrival_city}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400 font-bold uppercase text-[10px]">Seat</span>
                                <span className="font-bold">{selectedSeat ? selectedSeat.seat_number : '--'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400 font-bold uppercase text-[10px]">Class</span>
                                <span className="font-bold text-blue-400 italic">{selectedSeat ? selectedSeat.class : '--'}</span>
                            </div>
                            <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                                <span className="text-slate-400 font-bold uppercase text-[10px]">Final Price</span>
                                <span className="text-2xl font-black">₱{selectedSeat ? (Number(flight.base_price) + Number(selectedSeat.price)).toLocaleString() : Number(flight.base_price).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
}
