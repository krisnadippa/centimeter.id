"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-primary text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2">
             <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
             >
                <h4 className="text-secondary font-semibold uppercase tracking-widest text-sm mb-2">Get In Touch</h4>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Let&apos;s Find Your Dream Property</h2>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  Have questions about buying, selling, or renting in Bali? Our team is ready to assist you. 
                  Send us a message and we&apos;ll get back to you within 24 hours.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-secondary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Call Us</p>
                      <p className="font-semibold">+62 812 3456 7890</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-secondary">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email Us</p>
                      <p className="font-semibold">hello@centimeter.id</p>
                    </div>
                  </div>
                </div>
             </motion.div>
          </div>

          <div className="w-full md:w-1/2">
            <motion.form 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="bg-white p-8 rounded-2xl shadow-xl text-gray-900"
            >
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                   <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                </div>
                <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                   <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                </div>
              </div>
              <div className="mb-6">
                 <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                 <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
              </div>
              <div className="mb-8">
                 <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                 <textarea rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"></textarea>
              </div>
              <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all hover:shadow-lg flex items-center justify-center gap-2">
                 Send Message
                 <Send size={18} />
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
