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
  
  // If it's an iframe tag, extract the src (done in UI, but good to have here as backup)
  if (url.includes("<iframe")) {
      const match = url.match(/src=["']([^"']+)["']/);
      if (match && match[1]) return match[1];
  }

  // If it's a direct Google Maps link (short or long)
  if (url.includes("goo.gl/maps") || url.includes("maps.app.goo.gl") || url.includes("google.com/maps")) {
    try {
      console.log(`Resolving Google Maps URL: ${url}`);
      const response = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      
      const finalUrl = decodeURIComponent(response.url);
      
      // Try to extract coordinates
      const coordMatch = finalUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (coordMatch) {
         const lat = coordMatch[1];
         const lng = coordMatch[2];
         
         // Generate an official Embed URL using the !1m18 (Place) format if possible
         // We use the coordinates as the "Place" which forces a marker.
         const pb = `!1m18!1m12!1m3!1d1000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${lat}LCRsbmc!5e0!3m2!1sid!2sid!4v1700000000000`;
         return `https://www.google.com/maps/embed?pb=${pb}`;
      }
      
      // Fallback: If we couldn't resolve coordinates but have a search query in the final URL
      const searchMatch = finalUrl.match(/q=([^&]+)/) || finalUrl.match(/\/place\/([^/]+)/);
      if (searchMatch) {
          const query = searchMatch[1];
          // Classic embed format as a final fallback (might have SAMEORIGIN issues, but better than nothing)
          return `https://maps.google.com/maps?q=${query}&output=embed`;
      }
    } catch (error) {
      console.error("Failed to resolve Google Maps short link:", error);
    }
  }
  
  return url;
}
