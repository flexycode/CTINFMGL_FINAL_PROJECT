"use client";

import { motion } from "framer-motion";
import { Plane, Clock, Calendar, ArrowRight, Tag } from "lucide-react";
import { Flight } from "@/lib/types";
import Link from "next/link";

interface FlightCardProps {
    flight: Flight;
}

export default function FlightCard({ flight }: FlightCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all overflow-hidden group"
        >
            <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-600 transition-colors">
                            <Plane className="w-5 h-5 text-blue-600 group-hover:text-white rotate-45 transition-colors" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Flight ID: #{flight.id}</p>
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">ALA Airways</h3>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${flight.flight_status === 'AVAILABLE' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                            }`}>
                            {flight.flight_status}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-4 mb-8">
                    <div className="flex-1">
                        <p className="text-3xl font-black text-slate-900">{flight.departure_city}</p>
                        <p className="text-sm text-slate-500 font-medium">Origin</p>
                    </div>

                    <div className="flex flex-col items-center gap-1 px-4">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{flight.duration_hours}h flight</p>
                        <div className="w-24 h-[2px] bg-slate-100 relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                                <Plane className="w-3 h-3 text-slate-300" />
                            </div>
                        </div>
                        <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Non-stop</p>
                    </div>

                    <div className="flex-1 text-right">
                        <p className="text-3xl font-black text-slate-900">{flight.arrival_city}</p>
                        <p className="text-sm text-slate-500 font-medium">Destination</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-50">
                    <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-500">
                            <Calendar className="w-3.5 h-3.5" />
                            <span className="text-[11px] font-bold uppercase tracking-wider">Date</span>
                        </div>
                        <p className="text-sm font-bold text-slate-900">{new Date(flight.flight_date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right space-y-1">
                        <div className="flex items-center justify-end gap-1.5 text-slate-500">
                            <Tag className="w-3.5 h-3.5" />
                            <span className="text-[11px] font-bold uppercase tracking-wider">Starting from</span>
                        </div>
                        <p className="text-2xl font-black text-blue-600">₱{Number(flight.base_price).toLocaleString()}</p>
                    </div>
                </div>
            </div>

            <Link
                href={`/book/${flight.id}`}
                className="w-full bg-slate-900 group-hover:bg-blue-600 text-white font-bold py-4 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-widest text-center"
            >
                Select Flight
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
        </motion.div>
    );
}
