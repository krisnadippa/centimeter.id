"use client";

import { useState, useEffect } from "react";
import { Property } from "@/app/data/properties";
import { Plus, Search, Edit, Trash2, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AdminDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
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
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this property?")) return;
    
    setDeletingId(id);
    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        setProperties(properties.filter(p => p.id !== id));
      } else {
        alert("Failed to delete property");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("Error deleting property");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredProperties = properties.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.location.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="p-8 text-center text-gray-500">Loading properties...</div>;

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-zinc-500">Welcome back, here&apos;s your property overview.</p>
        </div>
        <Link 
          href="/admin/add" 
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
        >
          <Plus size={20} />
          Add New Property
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search properties..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
              <tr>
                <th className="p-4 w-20">Image</th>
                <th className="p-4">Title & Location</th>
                <th className="p-4">Price</th>
                <th className="p-4">Type</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProperties.length === 0 ? (
                 <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      No properties found.
                    </td>
                 </tr>
              ) : (
                filteredProperties.map((property) => (
                    <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-gray-100">
                          {property.image ? (
                             <Image src={property.image} alt={property.title} fill className="object-cover" />
                          ) : (
                             <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-gray-900">{property.title}</div>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <MapPin size={12} className="mr-1" />
                          {property.location}
                        </div>
                      </td>
                      <td className="p-4 text-sm font-medium text-gray-900">
                        {property.price}
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          property.type === 'Sale' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {property.type}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link 
                            href={`/admin/edit/${property.id}`}
                            className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </Link>
                          <button 
                            onClick={() => handleDelete(property.id)}
                            disabled={deletingId === property.id}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            {deletingId === property.id ? (
                                <span className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin block"></span>
                            ) : (
                                <Trash2 size={18} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-gray-100 text-xs text-gray-500 flex justify-between">
            <span>Showing {filteredProperties.length} properties</span>
            <span>Pagination coming soon</span>
        </div>
      </div>
    </div>
  );
}
