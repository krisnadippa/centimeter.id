import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Resolves Google Maps short links (goo.gl/maps, maps.app.goo.gl) 
 * and converts them to an embeddable URL format with a marker.
 */
export async function resolveGoogleMapsUrl(url: string | undefined): Promise<string | undefined> {
  if (!url) return url;
  
  // If it's already an embed URL, return as is
  if (url.includes("google.com/maps/embed")) return url;
  
  // If it's an iframe tag, extract the src
  if (url.includes("<iframe")) {
      const match = url.match(/src=["']([^"']+)["']/);
      if (match && match[1]) return match[1];
  }

  // If it's a direct Google Maps link (short or long)
  if (url.includes("goo.gl/maps") || url.includes("maps.app.goo.gl") || url.includes("google.com/maps")) {
    try {
      let finalUrl = url;
      
      // If it's a short link, we need to resolve it
      if (url.includes("goo.gl/maps") || url.includes("maps.app.goo.gl")) {
          // If in browser, use our proxy to bypass CORS
          if (typeof window !== 'undefined') {
              const res = await fetch(`/api/utils/resolve-map?url=${encodeURIComponent(url)}`);
              const data = await res.json();
              if (data.finalUrl) finalUrl = data.finalUrl;
          } else {
              // On server, we can fetch directly
              const response = await fetch(url, { method: 'GET', redirect: 'follow' });
              finalUrl = response.url;
          }
      }

      const decodedUrl = decodeURIComponent(finalUrl);
      
      // Try to extract coordinates
      const coordMatch = decodedUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (coordMatch) {
         const lat = coordMatch[1];
         const lng = coordMatch[2];
         
         // This !1m17!1m12 format is stable and bypasses SAMEORIGIN blocks
         // !3d is latitude, !2d is longitude
         const pb = `!1m17!1m12!1m3!1d3944.3!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1s0x0%3A0x0!2z${lat},${lng}!5e0`;
         return `https://www.google.com/maps/embed?pb=${pb}`;
      }
      
      // Fallback: If we couldn't resolve coordinates but have a search query
      const searchMatch = decodedUrl.match(/q=([^&]+)/) || decodedUrl.match(/\/place\/([^/]+)/);
      if (searchMatch) {
          return `https://maps.google.com/maps?q=${searchMatch[1]}&output=embed`;
      }
    } catch (error) {
      console.error("Failed to resolve Google Maps link:", error);
    }
  }
  
  return url;
}
