"use client";

import { useState } from "react";
import { Search, MapPin, Home } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"buy" | "rent">("buy");
  const [location, setLocation] = useState("Bali");
  const [type, setType] = useState("Any Type");
  const [price, setPrice] = useState("Any Price");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location !== "Bali") params.set("location", location);
    if (type !== "Any Type") params.set("type", type);
    if (price !== "Any Price") params.set("price", price);
    
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image / Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1938')",
        }}
        role="img"
        aria-label="Beautiful Bali Landscape"
      />

      <div className="container mx-auto px-6 relative z-20 w-full">
        <div className="max-w-4xl mx-auto text-center text-white mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6 font-sans tracking-tight"
          >
            Find Your Dream Paradise in <span className="text-secondary">Bali</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200"
          >
            Discover exclusive lands and luxury properties in the Island of Gods.
          </motion.p>
        </div>

        {/* Search Box */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-4 md:p-6 max-w-4xl mx-auto"
        >
          {/* Tabs */}
          <div className="flex space-x-4 mb-6 border-b border-gray-100 pb-2">
            <button
              onClick={() => setActiveTab("buy")}
              className={`pb-2 text-sm font-semibold transition-colors relative ${
                activeTab === "buy" ? "text-primary" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Buy
              {activeTab === "buy" && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-[-9px] left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab("rent")}
              className={`pb-2 text-sm font-semibold transition-colors relative ${
                activeTab === "rent" ? "text-primary" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Rent
              {activeTab === "rent" && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-[-9px] left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
          </div>

          {/* Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Location */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-primary h-5 w-5" />
                <select 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-gray-50 rounded-lg pl-10 pr-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
                >
                  <option value="Bali">All Bali</option>
                  <option value="Badung">Badung</option>
                  <option value="Bangli">Bangli</option>
                  <option value="Buleleng">Buleleng</option>
                  <option value="Denpasar">Denpasar</option>
                  <option value="Gianyar">Gianyar</option>
                  <option value="Jembrana">Jembrana</option>
                  <option value="Karangasem">Karangasem</option>
                  <option value="Klungkung">Klungkung</option>
                  <option value="Tabanan">Tabanan</option>
                </select>
              </div>
            </div>

            {/* Property Type */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Type</label>
              <div className="relative">
                <Home className="absolute left-3 top-3 text-primary h-5 w-5" />
                <select 
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-gray-50 rounded-lg pl-10 pr-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
                >
                  <option>Any Type</option>
                  <option>Land</option>
                  <option>Villa</option>
                  <option>House</option>
                  <option>Apartment</option>
                </select>
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Price</label>
              <div className="relative">
                <div className="absolute left-3 top-3 h-5 w-5 flex items-center justify-center text-primary font-bold text-sm">Rp</div>
                <select 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-gray-50 rounded-lg pl-10 pr-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
                >
                  <option>Any Price</option>
                  <option>Rp 100 Juta - 1 Miliar</option>
                  <option>Rp 1 Miliar - 5 Miliar</option>
                  <option>Rp 5 Miliar+</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <button 
              onClick={handleSearch}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Search className="h-5 w-5" />
              Search
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
