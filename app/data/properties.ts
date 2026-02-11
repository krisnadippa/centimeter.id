export interface Property {
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
  description: string;
  images: string[];
  features: string[];
  google_maps_url?: string;
}

// Helper to get default empty property for initial state if needed
export const defaultProperty: Property = {
    id: 0,
    title: "",
    price: "",
    location: "",
    area: "",
    image: "",
    type: "Sale",
    category: "Land",
    description: "",
    images: [],
    features: []
};

// Initial empty array to satisfy current imports until they are refactored
export const properties: Property[] = [];
