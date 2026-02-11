"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Bed, Bath, Move, Smartphone } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useRouter } from "next/navigation";
import { Property } from "@/app/data/properties";

export default function PropertyDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [property, setProperty] = useState<Property | null | undefined>(undefined);

  useEffect(() => {
    async function fetchProperty() {
        try {
            const res = await fetch(`/api/properties/${resolvedParams.id}`);
            if (res.status === 404) {
                setProperty(null);
                return;
            }
            if (!res.ok) throw new Error("Failed to fetch");
            const data: Property = await res.json();
            setProperty(data);
        } catch (error) {
            console.error("Error fetching property:", error);
            setProperty(null);
        }
    }
    fetchProperty();
  }, [resolvedParams.id]);

  if (property === undefined) {
    return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>;
  }

  if (property === null) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
        <Link href="/" className="text-primary hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  const whatsappMessage = `Hello, I am interested in ${property.title} located at ${property.location}. Can you provide more details?`;
  const whatsappLink = `https://wa.me/6281339711438?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar theme="light" />

      <div className="pt-24 pb-10 container mx-auto px-6">
        <button 
            onClick={() => router.back()}
            className="flex items-center text-zinc-500 hover:text-primary transition-colors mb-6"
        >
            <ArrowLeft size={20} className="mr-2" />
            Back to Listings
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Image Gallery */}
            <div className="space-y-4">
                <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-lg">
                    <Image
                        src={property.image}
                        alt={property.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                        priority
                    />
                    <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-white uppercase tracking-wide">
                        {property.type}
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {property.images && property.images.slice(0, 3).map((img, idx) => (
                        <div key={idx} className="relative h-32 w-full rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer">
                            <Image
                                src={img}
                                alt={`${property.title} - ${idx + 1}`}
                                fill
                                className="object-cover hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Details */}
            <div className="flex flex-col">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex-grow">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                             <span className="text-secondary font-semibold uppercase tracking-widest text-xs mb-2 block">
                                {property.category}
                             </span>
                             <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{property.title}</h1>
                        </div>
                    </div>
                   
                    <p className="text-3xl font-bold text-primary mb-6">{property.price}</p>
                    
                    <div className="flex items-center text-gray-500 mb-8 border-b border-gray-100 pb-8">
                        <MapPin size={20} className="mr-2 text-secondary" />
                        <span className="text-lg">{property.location}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-6 mb-8">
                        <div className="text-center p-4 bg-gray-50 rounded-xl">
                            <Move size={24} className="mx-auto mb-2 text-primary" />
                            <p className="font-bold text-gray-900">{property.area}</p>
                            <p className="text-xs text-zinc-500 uppercase">Area</p>
                        </div>
                        {property.beds && (
                            <div className="text-center p-4 bg-gray-50 rounded-xl">
                                <Bed size={24} className="mx-auto mb-2 text-primary" />
                                <p className="font-bold text-gray-900">{property.beds}</p>
                                <p className="text-xs text-zinc-500 uppercase">Beds</p>
                            </div>
                        )}
                        {property.baths && (
                            <div className="text-center p-4 bg-gray-50 rounded-xl">
                                <Bath size={24} className="mx-auto mb-2 text-primary" />
                                <p className="font-bold text-gray-900">{property.baths}</p>
                                <p className="text-xs text-zinc-500 uppercase">Baths</p>
                            </div>
                        )}
                    </div>

                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
                        <p className="text-zinc-600 leading-relaxed">
                            {property.description}
                        </p>
                    </div>

                    {property.features && (
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Features</h3>
                            <ul className="grid grid-cols-2 gap-2">
                                {property.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center text-zinc-600">
                                        <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {property.google_maps_url && (
                        <div className="mb-4">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Location</h3>
                            <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm h-64 w-full">
                                <iframe
                                    src={property.google_maps_url}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile Floating Action Button Placeholder for desktop layout alignment if needed, 
                    but here we just place the button in the flow or sticky */}
            </div>
        </div>
      </div>
      
      {/* Sticky WhatsApp Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40 shadow-[0_-5px_20px_rgba(0,0,0,0.1)]">
        <div className="container mx-auto px-6 flex items-center justify-between">
            <div className="hidden md:block">
                <p className="text-sm text-zinc-500">Interested in this property?</p>
                <p className="font-bold text-primary text-xl">{property.price}</p>
            </div>
            <a 
                href={whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full md:w-auto bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 px-8 rounded-xl transition-all hover:shadow-lg flex items-center justify-center gap-3 animate-pulse-slow"
            >
                <Smartphone size={24} />
                Chat via WhatsApp
            </a>
        </div>
      </div>

      <Footer />
    </main>
  );
}
