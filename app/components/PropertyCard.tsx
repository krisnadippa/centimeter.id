"use client";

import Image from "next/image";
import { Bed, Bath, Move, MapPin } from "lucide-react";
import { motion } from "framer-motion";

import Link from "next/link";

interface PropertyProps {
  id: number;
  title: string;
  price: string;
  location: string;
  beds?: number;
  baths?: number;
  area: string;
  image: string;
  type: "Sale" | "Rent";
  category: "Land" | "Villa" | "House" | "Apartment";
}

export default function PropertyCard({ property }: { property: PropertyProps }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group h-full flex flex-col"
    >
      <div className="relative h-64 w-full overflow-hidden shrink-0">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wide">
          For {property.type}
        </div>
        <div className="absolute top-4 right-4 bg-secondary/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wide">
           {property.category}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-1">{property.title}</h3>
        <p className="text-xl font-bold text-primary mb-4">{property.price}</p>
        
        <div className="flex items-center text-gray-500 mb-4 text-sm">
          <MapPin size={16} className="mr-1 text-secondary" />
          <span className="line-clamp-1">{property.location}</span>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-sm text-gray-600 mt-auto">
          {property.beds && (
            <div className="flex items-center gap-1">
              <Bed size={16} />
              <span>{property.beds} Beds</span>
            </div>
          )}
          {property.baths && (
            <div className="flex items-center gap-1">
              <Bath size={16} />
              <span>{property.baths} Baths</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Move size={16} />
            <span>{property.area}</span>
          </div>
        </div>
        
        <Link 
          href={`/properties/${property.id}`}
          className="w-full mt-6 bg-gray-50 text-gray-900 font-semibold py-3 rounded-xl hover:bg-primary hover:text-white transition-colors text-center block"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}
