"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image Side */}
          <div className="w-full md:w-1/2">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl"
            >
               <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: "url('https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=1888')",
                }}
                role="img"
                aria-label="Bali Rice Terrace"
              />
            </motion.div>
          </div>

          {/* Text Side */}
          <div className="w-full md:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h4 className="text-secondary font-semibold uppercase tracking-widest text-sm mb-2">About Us</h4>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Redefining Real Estate in <span className="text-black">Bali</span>
              </h2>
              <p className="text-zinc-600 mb-6 leading-relaxed">
                At <span className="font-semibold text-primary">centimeter.id</span>, we specialize in connecting discerning clients with the most exclusive properties in Bali. Whether you are looking for a beachfront villa, a serene plot of land in Ubud, or a high-yield investment opportunity, we are your trusted guide.
              </p>
              <p className="text-zinc-600 mb-8 leading-relaxed">
                Our team of local experts combines deep market knowledge with international standards of service to ensure a seamless and transparent transaction process.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-secondary">500+</h3>
                  <p className="text-zinc-500 text-sm">Properties Sold</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-secondary">100%</h3>
                  <p className="text-zinc-500 text-sm">Client Satisfaction</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
