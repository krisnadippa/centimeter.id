"use client";

import PropertyCard from "./PropertyCard";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Property } from "@/app/data/properties";

export default function FeaturedProperties() {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch("/api/properties");
        if (!res.ok) throw new Error("Failed to fetch");
        const data: Property[] = await res.json();
        setFeaturedProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  return (
    <section id="properties" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h4 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-secondary font-semibold uppercase tracking-widest text-sm mb-2"
          >
            Exclusive Listings
          </motion.h4>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-primary mb-6"
          >
            Featured Properties
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 max-w-2xl mx-auto"
          >
            Handpicked properties offering the best of Bali living. From cliffside villas to serene rice field plots.
          </motion.p>
        </div>

        {loading ? (
             <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
             </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.slice(0, 6).map((property, index) => (
                <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                >
                <PropertyCard property={property} />
                </motion.div>
            ))}
            </div>
        )}

        <div className="text-center mt-16">
          <Link 
            href="/properties"
            className="bg-transparent border-2 border-primary text-primary font-bold py-3 px-8 rounded-full hover:bg-primary hover:text-white transition-colors inline-block"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
}
