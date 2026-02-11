"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const reviews = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Property Investor",
    content: "Centimeter.id helped me find the perfect investment land in Canggu. Their professional team guided me through every step.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Expat",
    content: "Renting a villa for my family was seamless. The options provided were exactly what we were looking for. Highly recommended!",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100"
  },
  {
    id: 3,
    name: "Emma Wilson",
    role: "Digital Nomad",
    content: "I needed a place with good wifi and a view. They found me a gem in Ubud that exceeded my expectations.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100"
  }
];

export default function Reviews() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h4 className="text-secondary font-semibold uppercase tracking-widest text-sm mb-2">Testimonials</h4>
          <h2 className="text-3xl md:text-5xl font-bold text-primary">What Our Clients Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex text-secondary mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" className="mr-1" />
                ))}
              </div>
              <p className="text-zinc-600 mb-6 italic">&quot;{review.content}&quot;</p>
              <div className="flex items-center">
                <div className="relative w-12 h-12 mr-4">
                  <Image 
                    src={review.image} 
                    alt={review.name} 
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h5 className="font-bold text-primary">{review.name}</h5>
                  <span className="text-xs text-zinc-500 uppercase">{review.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
