import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";
import { Property } from "@/app/data/properties";
import { resolveGoogleMapsUrl } from "@/app/lib/utils";

export const dynamic = 'force-dynamic'; // Ensure no caching for this route

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('id', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch properties:", error);
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newProperty: Property = await request.json();
    
    // Resolve Google Maps link if present (Short link -> Embed URL)
    if (newProperty.google_maps_url) {
        newProperty.google_maps_url = await resolveGoogleMapsUrl(newProperty.google_maps_url) || "";
    }
    
    // Remove ID if it's present (let DB handle generation)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...propertyData } = newProperty;

    const { data, error } = await supabase
      .from('properties')
      .insert([propertyData])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Failed to save property:", error);
    return NextResponse.json({ error: "Failed to save property" }, { status: 500 });
  }
}
