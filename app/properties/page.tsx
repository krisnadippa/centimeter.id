"use client";

import { useState, useEffect, Suspense } from "react";
import { Search, MapPin, Home } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import PropertyCard from "@/app/components/PropertyCard";
import { useSearchParams } from "next/navigation";
import { Property } from "@/app/data/properties";

function PropertiesList() {
  const searchParams = useSearchParams();
  const [locationFilter, setLocationFilter] = useState("Bali");
  const [typeFilter, setTypeFilter] = useState("Any Type");
  const [priceFilter, setPriceFilter] = useState("Any Price");
  const [sortBy, setSortBy] = useState("Newest");
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
        try {
            const res = await fetch("/api/properties");
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setProperties(data);
        } catch (error) {
            console.error("Error fetching properties:", error);
        } finally {
            setLoading(false);
        }
    }
    fetchProperties();
  }, []);

  // Initialize state from URL params
  useEffect(() => {
    const loc = searchParams.get("location");
    const type = searchParams.get("type");
    const price = searchParams.get("price");

    if (loc) setLocationFilter(loc);
    if (type) setTypeFilter(type);
    if (price) setPriceFilter(price);
  }, [searchParams]);

  const parsePrice = (priceStr: string) => {
    return parseInt(priceStr.replace(/\D/g, ""));
  };

  const filteredProperties = properties.filter((property) => {
    // Location Filter
    if (locationFilter !== "Bali" && !property.location.includes(locationFilter)) {
      return false;
    }
    // Type Filter
    if (typeFilter !== "Any Type" && property.category !== typeFilter) {
        return false;
    }
    
    // Price Filter (Basic implementation based on ranges string matching for now)
    if (priceFilter !== "Any Price") {
         return true; // Simplified for now as per original code
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === "Price: Low to High") {
        return parsePrice(a.price) - parsePrice(b.price);
    } else if (sortBy === "Price: High to Low") {
        return parsePrice(b.price) - parsePrice(a.price);
    } else {
        // "Newest" - assuming higher ID is newer
        return b.id - a.id;
    }
  });

  return (
    <>
      {/* Header / Search Section */}
      <div className="relative bg-primary pt-32 pb-20 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
            </svg>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
            <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold mb-6 text-center"
            >
                Find Your Dream Property
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center text-gray-200 mb-12 max-w-2xl mx-auto text-lg"
            >
                Browse our exclusive collection of villas, lands, and homes in the most beautiful locations of Bali.
            </motion.p>
            
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-6xl mx-auto text-gray-900"
            >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Location</label>
                        <div className="relative group">
                            <MapPin className="absolute left-3 top-3.5 text-primary h-5 w-5 group-hover:text-secondary transition-colors" />
                            <select 
                                value={locationFilter}
                                onChange={(e) => setLocationFilter(e.target.value)}
                                className="w-full bg-gray-50 hover:bg-gray-100 transition-colors rounded-xl pl-10 pr-4 py-3.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer font-medium"
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

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Type</label>
                        <div className="relative group">
                            <Home className="absolute left-3 top-3.5 text-primary h-5 w-5 group-hover:text-secondary transition-colors" />
                            <select 
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                                className="w-full bg-gray-50 hover:bg-gray-100 transition-colors rounded-xl pl-10 pr-4 py-3.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer font-medium"
                            >
                                <option>Any Type</option>
                                <option>Land</option>
                                <option>Villa</option>
                                <option>House</option>
                                <option>Apartment</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Price</label>
                        <div className="relative group">
                           <div className="absolute left-3 top-3.5 h-5 w-5 flex items-center justify-center text-primary font-bold text-sm group-hover:text-secondary transition-colors">Rp</div>
                            <select 
                                value={priceFilter}
                                onChange={(e) => setPriceFilter(e.target.value)}
                                className="w-full bg-gray-50 hover:bg-gray-100 transition-colors rounded-xl pl-10 pr-4 py-3.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer font-medium"
                            >
                                <option>Any Price</option>
                                <option>Rp 100 Juta - 1 Miliar</option>
                                <option>Rp 1 Miliar - 5 Miliar</option>
                                <option>Rp 5 Miliar+</option>
                            </select>
                        </div>
                    </div>

                    <button className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-3.5 rounded-xl transition-all hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2">
                        <Search className="h-5 w-5" />
                        Search Properties
                    </button>
                </div>
            </motion.div>
        </div>
      </div>

      {/* Property Grid */}
      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 pb-6 border-b border-gray-200">
            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Properties For Sale & Rent
                </h2>
                <p className="text-zinc-500">Showing {filteredProperties.length} available properties</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-500">Sort by:</span>
                <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 cursor-pointer"
                >
                    <option>Newest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                </select>
            </div>
        </div>

        {loading ? (
             <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
             </div>
        ) : filteredProperties.length > 0 ? (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {filteredProperties.map((property, index) => (
                        <motion.div
                            key={property.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <PropertyCard property={property} />
                        </motion.div>
                    ))}
                </div>
                
                {/* Pagination / Load More */}
                <div className="flex justify-center">
                    <button className="px-8 py-3 bg-white border border-gray-300 rounded-full font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors shadow-sm">
                        Load More Properties
                    </button>
                </div>
            </>
        ) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Properties Found</h3>
                <p className="text-zinc-500 mb-6">We couldn&apos;t find any properties matching your current filters.</p>
                <button 
                    onClick={() => {
                        setLocationFilter("Bali");
                        setTypeFilter("Any Type");
                        setPriceFilter("Any Price");
                    }}
                    className="text-primary font-bold hover:underline"
                >
                    Clear All Filters
                </button>
            </div>
        )}
      </div>
    </>
  );
}

export default function PropertiesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar theme="light" />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading properties...</div>}>
        <PropertiesList />
      </Suspense>
      <Footer />
    </main>
  );
}
