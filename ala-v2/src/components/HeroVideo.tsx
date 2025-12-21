"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const HeroVideo = () => {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center p-8">
      {/* Background Video */}
      <video
        className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/philippineTrip.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 text-center text-white"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
          El Nido
        </h1>
        
        <div className="flex items-center justify-center gap-2 mb-6 text-xl md:text-2xl font-medium">
          <MapPin className="w-6 h-6 text-blue-400" />
          <span className="tracking-wide">Palawan</span>
        </div>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full inline-block"
        >
          <span className="text-lg font-semibold uppercase tracking-widest">
            Available Now!
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroVideo;
