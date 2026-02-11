"use client";

import { useState, useEffect, use } from "react";
import { Property } from "@/app/data/properties";
import { Save, ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params using use() hook
  const { id } = use(params);
  
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<Property>>({
    title: "",
    price: "",
    location: "Bali", 
    area: "",
    image: "", 
    type: "Sale",
    category: "Villa",
    description: "",
    images: [], 
    features: [], 
    google_maps_url: "",
  });

  const [featuresInput, setFeaturesInput] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [uploading, setUploading] = useState(false);
  const [loadingConfig, setLoadingConfig] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/properties/${id}`);
        if (!res.ok) throw new Error("Failed to fetch property");
        const data: Property = await res.json();
        setFormData(data);
        if (data.features) {
            setFeaturesInput(data.features.join(", "));
        }
      } catch (error) {
        console.error("Error fetching property:", error);
        setStatus("error");
      } finally {
        setLoadingConfig(false);
      }
    };

    if (id) {
        fetchProperty();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Automatically extract src from iframe if pasted into google_maps_url
    if (name === "google_maps_url") {
        if (value.includes("<iframe")) {
            const match = value.match(/src=["']([^"']+)["']/);
            if (match && match[1]) {
                setFormData((prev) => ({ ...prev, [name]: match[1] }));
                return;
            }
        }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatPrice = (value: string) => {
    // Remove existing formatting to get raw number
    const cleanValue = value.replace(/[^0-9]/g, "");
    if (!cleanValue) return "";
    
    // Format to currency IDR
    const number = parseInt(cleanValue, 10);
    return `Rp ${number.toLocaleString("id-ID")}`;
  };

  const handlePriceBlur = () => {
      if (formData.price) {
          setFormData(prev => ({ ...prev, price: formatPrice(prev.price || "") }));
      }
  };

  const handleAreaBlur = () => {
      if (formData.area) {
          let val = formData.area.trim();
          // If content doesn't have m2, are, etc. append m2
          if (!val.toLowerCase().includes("m") && !val.toLowerCase().includes("are")) {
              val += " m²";
          }
          setFormData(prev => ({ ...prev, area: val }));
      }
  };

  const uploadFile = async (file: File): Promise<string | null> => {
      const data = new FormData();
      data.append("file", file);

      try {
          const res = await fetch("/api/upload", {
              method: "POST",
              body: data,
          });
          
          if (!res.ok) throw new Error("Upload fail");
          const json = await res.json();
          return json.url;
      } catch (err) {
          console.error(err);
          return null;
      }
  };

  const handleMainImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          setUploading(true);
          const url = await uploadFile(e.target.files[0]);
          if (url) {
              setFormData(prev => ({ ...prev, image: url }));
          }
          setUploading(false);
      }
  };

  const handleGalleryImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
          setUploading(true);
          const urls: string[] = [];
          for (let i = 0; i < e.target.files.length; i++) {
              const url = await uploadFile(e.target.files[i]);
              if (url) urls.push(url);
          }
          setFormData(prev => ({ 
              ...prev, 
              images: [...(prev.images || []), ...urls] 
          }));
          setUploading(false);
      }
  };

  const removeGalleryImage = (index: number) => {
      setFormData(prev => ({
          ...prev,
          images: prev.images?.filter((_, i) => i !== index)
      }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
        alert("Please upload a main image");
        return;
    }
    
    setStatus("loading");

    try {
      const featuresArray = featuresInput.split(",").map((s) => s.trim()).filter((s) => s !== "");
      
      const gallery = formData.images || [];
      if (gallery.length === 0 && formData.image) {
          gallery.push(formData.image);
      }

      const propertyToSave = {
        ...formData,
        images: gallery,
        features: featuresArray,
        beds: formData.beds ? Number(formData.beds) : undefined,
        baths: formData.baths ? Number(formData.baths) : undefined,
      } as Property;

      const res = await fetch(`/api/properties/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(propertyToSave),
      });

      if (!res.ok) throw new Error("Failed to update property");

      setStatus("success");
      
      // Delay redirect
      setTimeout(() => {
          router.push("/admin");
      }, 1500);

    } catch (error) {
      console.error("Error updating property:", error);
      setStatus("error");
    }
  };

  if (loadingConfig) return <div className="p-8 text-center">Loading...</div>;
  if (!formData.title && status === "error") return <div className="p-8 text-center text-red-500">Property not found.</div>;

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link 
            href="/admin" 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:text-primary hover:border-primary transition-all"
        >
            <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Property</h1>
          <p className="text-zinc-500">Update property details.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl">
         
        <div className="p-8">
            {status === "success" && (
                <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center">
                    <span className="font-bold mr-2">Success!</span> Property updated. Redirecting...
                </div>
            )}
            
            {status === "error" && !loadingConfig && (
                <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
                    <span className="font-bold mr-2">Error!</span> Failed to update property.
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            required
                            value={formData.title || ""}
                            onChange={handleChange}
                            placeholder="e.g. Luxury Cliffside Villa"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                        <input
                            type="text"
                            name="price"
                            required
                            value={formData.price || ""}
                            onChange={handleChange}
                            onBlur={handlePriceBlur}
                            placeholder="e.g. 15000000000"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                        <p className="text-xs text-gray-400 mt-1">Type raw numbers, we&apos;ll format it for you.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <input
                            type="text"
                            name="location"
                            required
                            value={formData.location || ""}
                            onChange={handleChange}
                            placeholder="e.g. Badung (Uluwatu)"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Area (Size)</label>
                        <input
                            type="text"
                            name="area"
                            required
                            value={formData.area || ""}
                            onChange={handleChange}
                            onBlur={handleAreaBlur}
                            placeholder="e.g. 500"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                        <p className="text-xs text-gray-400 mt-1">We&apos;ll add m² automatically if missing.</p>
                    </div>
                </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select
                            name="category"
                            value={formData.category || "Villa"}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                        >
                            <option value="Villa">Villa</option>
                            <option value="Land">Land</option>
                            <option value="House">House</option>
                            <option value="Apartment">Apartment</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                        <select
                            name="type"
                            value={formData.type || "Sale"}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                        >
                            <option value="Sale">Sale</option>
                            <option value="Rent">Rent</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Beds</label>
                            <input
                                type="number"
                                name="beds"
                                value={formData.beds || ""}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Baths</label>
                            <input
                                type="number"
                                name="baths"
                                value={formData.baths || ""}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>
                    </div>
                 </div>

                 {/* Description */}
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                        name="description"
                        required
                        value={formData.description || ""}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                </div>

                {/* Images */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Main Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleMainImageChange}
                            className="block w-full text-sm text-slate-500
                              file:mr-4 file:py-2 file:px-4
                              file:rounded-full file:border-0
                              file:text-sm file:font-semibold
                              file:bg-primary/10 file:text-primary
                              hover:file:bg-primary/20
                            "
                        />
                        {formData.image && (
                            <div className="mt-2 relative h-40 w-full md:w-60 rounded-lg overflow-hidden border border-gray-200">
                                <Image src={formData.image} alt="Main" fill className="object-cover" />
                            </div>
                        )}
                    </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Images (Multiple)</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleGalleryImagesChange}
                            className="block w-full text-sm text-slate-500
                              file:mr-4 file:py-2 file:px-4
                              file:rounded-full file:border-0
                              file:text-sm file:font-semibold
                              file:bg-secondary/10 file:text-secondary
                              hover:file:bg-secondary/20
                            "
                        />
                        {formData.images && formData.images.length > 0 && (
                            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                                {formData.images.map((img, idx) => (
                                     <div key={idx} className="relative h-24 rounded-lg overflow-hidden border border-gray-200 group">
                                         <Image src={img} alt={`Gallery ${idx}`} fill className="object-cover" />
                                         <button
                                            type="button"
                                            onClick={() => removeGalleryImage(idx)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                         >
                                             <X size={12} />
                                         </button>
                                     </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>


                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Features (Comma separated)</label>
                    <textarea
                        value={featuresInput}
                        onChange={(e) => setFeaturesInput(e.target.value)}
                        rows={2}
                        placeholder="Ocean View, Private Pool, Gym"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Google Maps Embed URL</label>
                    <textarea
                        name="google_maps_url"
                        value={formData.google_maps_url || ""}
                        onChange={handleChange}
                        rows={2}
                        placeholder="https://www.google.com/maps/embed?pb=..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-mono"
                    />
                    <p className="text-xs text-gray-400 mt-1">Copy the &apos;src&apos; link from Google Maps Embed code (iframe).</p>

                    {formData.google_maps_url && (formData.google_maps_url.includes("maps.app.goo.gl") || formData.google_maps_url.includes("goo.gl/maps")) && (
                        <div className="mt-2 text-xs text-red-500 bg-red-50 p-2 rounded border border-red-100 flex flex-col gap-1">
                            <p className="font-bold">⚠️ Invalid Link Detected</p>
                            <p>You are using a short link. This will NOT work in an iframe.</p>
                            <p>Please use the <strong>Embed a map</strong> tab in Google Maps and copy the <strong>src</strong> attribute.</p>
                        </div>
                    )}
                    
                    {formData.google_maps_url && formData.google_maps_url.startsWith("https://") && !formData.google_maps_url.includes("google.com/maps/embed") && !formData.google_maps_url.includes("maps.app.goo.gl") && !formData.google_maps_url.includes("goo.gl/maps") && (
                        <div className="mt-2 text-xs text-amber-500 bg-amber-50 p-2 rounded border border-amber-100 flex flex-col gap-1">
                            <p className="font-bold">⚠️ Potential Issue</p>
                            <p>This doesn&apos;t look like a standard Google Maps Embed URL. If the map doesn&apos;t show up, check the link format.</p>
                        </div>
                    )}
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={status === "loading" || uploading}
                        className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${
                            status === "loading" || uploading
                            ? "bg-gray-400 cursor-not-allowed" 
                            : "bg-secondary hover:bg-secondary/90 hover:shadow-lg active:scale-[0.98]"
                        }`}
                    >
                        {status === "loading" || uploading ? (
                            <>Processing...</>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                Update Property
                            </>
                        )}
                    </button>
                </div>

            </form>
        </div>
      </div>
    </div>
  );
}
