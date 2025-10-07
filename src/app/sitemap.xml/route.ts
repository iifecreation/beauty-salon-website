import { NextResponse } from 'next/server';

async function fetchJson(path: string) {
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
    const res = await fetch(`${base}${path}`);
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    return [];
  }
}

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

  // Static routes
  const staticUrls = ['/', '/about', '/services', '/courses', '/contact', '/work'];

  // Dynamic: fetch services and courses from API
  const [services, courses] = await Promise.all([
    fetchJson('/api/services'),
    fetchJson('/api/courses'),
  ]);

  const urls: string[] = [];

  staticUrls.forEach((p) => urls.push(`${base}${p}`));

  if (Array.isArray(services)) {
    services.forEach((s: any) => {
      if (s && s._id) urls.push(`${base}/services/${s._id}`);
    });
  }

  if (Array.isArray(courses)) {
    courses.forEach((c: any) => {
      if (c && c._id) urls.push(`${base}/courses/${c._id}`);
    });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((url) => `  <url>\n    <loc>${url}</loc>\n  </url>`)
    .join('\n')}\n</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
