export default {
  // Always revalidate in the browser
  "Cache-Control": "public, max-age=0, must-revalidate",
  // Cache for a year in the CDN
  "Netlify-CDN-Cache-Control": "public, s-maxage=31536000",
  "Netlify-Vary": "query,cookie=preview",
};

export async function staticHeaders(request: Request) {
  const headers: any = {
    "Cache-Control": "public, max-age=0, must-revalidate",
    "Netlify-CDN-Cache-Control": "public, s-maxage=31536000, stale-while-revalidate=604800",
    "Netlify-Vary": "query,cookie=preview",
  };

  return headers;
}
