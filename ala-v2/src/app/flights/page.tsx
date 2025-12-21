"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { searchFlights, getFlights } from "@/lib/services";
import { Flight } from "@/lib/types";
import FlightCard from "@/components/FlightCard";
import { Plane, Search, Filter, SlidersHorizontal, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

function FlightResultsContent() {
    const searchParams = useSearchParams();
    const [flights, setFlights] = useState<Flight[]>([]);
    const [loading, setLoading] = useState(true);

    const origin = searchParams.get("from") || "";
    const destination = searchParams.get("to") || "";
    const date = searchParams.get("date") || "";

    useEffect(() => {
        const fetchFlights = async () => {
            setLoading(true);
            let results;
            if (origin || destination || date) {
                results = await searchFlights(origin, destination, date);
            } else {
                results = await getFlights();
            }
            setFlights(results);
            setLoading(false);
        };

        fetchFlights();
    }, [origin, destination, date]);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Search Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                            <ArrowLeft className="w-5 h-5 text-slate-600" />
                        </Link>
                        <div>
                            <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
                                <Plane className="w-5 h-5 text-blue-600 rotate-45" />
                                Available Flights
                            </h1>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                                {flights.length} results found for your search
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                            <button className="px-4 py-2 bg-white shadow-sm rounded-lg text-xs font-bold text-slate-900 border border-slate-200">
                                Cheapest
                            </button>
                            <button className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-900">
                                Fastest
                            </button>
                        </div>
                        <button className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                            <SlidersHorizontal className="w-5 h-5 text-slate-600" />
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Sidebar Filters */}
                    <aside className="hidden lg:block space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                <Filter className="w-4 h-4 text-blue-600" />
                                Stops
                            </h3>
                            <div className="space-y-3">
                                {['Non-stop', '1 Stop', '2+ Stops'].map((stop) => (
                                    <label key={stop} className="flex items-center gap-3 cursor-pointer group">
                                        <input type="checkbox" className="w-5 h-5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                                        <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{stop}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                                Airlines
                            </h3>
                            <div className="space-y-3">
                                {['ALA Airways', 'Palawan Express', 'Island Hopper'].map((airline) => (
                                    <label key={airline} className="flex items-center gap-3 cursor-pointer group">
                                        <input type="checkbox" className="w-5 h-5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                                        <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{airline}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Results Grid */}
                    <div className="lg:col-span-3">
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-96 rounded-2xl bg-white border border-slate-100 animate-pulse shadow-sm" />
                                ))}
                            </div>
                        ) : flights.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {flights.map((flight) => (
                                    <FlightCard key={flight.id} flight={flight} />
                                ))}
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-24 bg-white rounded-3xl border border-slate-200 shadow-sm"
                            >
                                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Search className="w-8 h-8 text-slate-300" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">No flights found</h2>
                                <p className="text-slate-500 mb-8 max-w-xs mx-auto">Try adjusting your filters or searching for different cities and dates.</p>
                                <Link href="/" className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
                                    Go Back Home
                                </Link>
                            </motion.div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function FlightsPage() {
    return (
        <Suspense fallback={<div>Loading flights...</div>}>
            <FlightResultsContent />
        </Suspense>
    );
}
