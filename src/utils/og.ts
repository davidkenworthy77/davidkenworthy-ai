/**
 * Fetches Open Graph metadata from a URL at build time.
 * Used to enrich daily link posts with preview images.
 */

const ogCache = new Map<string, { image?: string; title?: string; description?: string }>();

export async function fetchOgImage(url: string): Promise<string | undefined> {
  // Return from cache if we already fetched this URL
  if (ogCache.has(url)) {
    return ogCache.get(url)?.image;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'Accept': 'text/html',
      },
    });

    clearTimeout(timeout);

    if (!res.ok) {
      ogCache.set(url, {});
      return undefined;
    }

    const html = await res.text();

    // Parse og:image
    const imageMatch = html.match(
      /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i
    ) || html.match(
      /<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i
    );

    const image = imageMatch?.[1];

    ogCache.set(url, { image });
    return image;
  } catch (e) {
    // Network error, timeout, etc - fail silently
    ogCache.set(url, {});
    return undefined;
  }
}
