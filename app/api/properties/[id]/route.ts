import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";
import { Property } from "@/app/data/properties";
import { resolveGoogleMapsUrl } from "@/app/lib/utils";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
         if (error.code === 'PGRST116') { // code for no rows returned
             return NextResponse.json({ error: "Property not found" }, { status: 404 });
         }
         throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching property:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updatedData: Partial<Property> = await request.json();

    // Resolve Google Maps link if present (Short link -> Embed URL)
    if (updatedData.google_maps_url) {
        updatedData.google_maps_url = await resolveGoogleMapsUrl(updatedData.google_maps_url) || "";
    }

    const { data, error } = await supabase
        .from('properties')
        .update(updatedData)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating property:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting property:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
