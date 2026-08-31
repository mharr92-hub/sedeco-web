/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.convex.cloud" },
      { protocol: "https", hostname: "img.clerk.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/gracias",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
    ];
  },
  async redirects() {
    const canonicalOrigin = "https://www.sedeco.lat";
    const apexHostRedirects = [
      {
        source: "/",
        has: [{ type: "host", value: "sedeco.lat" }],
        destination: `${canonicalOrigin}/`,
        statusCode: 301,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "sedeco.lat" }],
        destination: `${canonicalOrigin}/:path*`,
        statusCode: 301,
      },
    ];
    // Host redirects only fire if DNS for that host points at this Vercel
    // project. Vercel Domains should also redirect apex → www.
    const legacyHosts = [
      "selladodeconcreto.com",
      "www.selladodeconcreto.com",
    ];
    const legacyHostRedirects = legacyHosts.flatMap((host) => [
      {
        source: "/",
        has: [{ type: "host", value: host }],
        destination: `${canonicalOrigin}/`,
        statusCode: 301,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: host }],
        destination: `${canonicalOrigin}/:path*`,
        statusCode: 301,
      },
    ]);

    return [
      { source: "/inicio", destination: "/", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      {
        source: "/sellado-concreto",
        destination: "/pisos-industriales-panama",
        statusCode: 301,
      },
      {
        source: "/impermeabilizacion-azoteas",
        destination: "/impermeabilizacion-panama",
        statusCode: 301,
      },
      {
        source: "/servicios/impermeabilizacion",
        destination: "/impermeabilizacion-panama",
        permanent: true,
      },
      {
        source: "/servicios/fachadas",
        destination: "/impermeabilizacion-fachadas",
        permanent: true,
      },
      {
        source: "/servicios/azoteas",
        destination: "/impermeabilizacion-panama",
        permanent: true,
      },
      {
        source: "/servicios/filtraciones",
        destination: "/filtraciones-panama",
        permanent: true,
      },
      {
        source: "/servicios/sellado-concreto",
        destination: "/pisos-industriales-panama",
        permanent: true,
      },
      {
        source: "/servicios/tanques",
        destination: "/impermeabilizacion-panama",
        permanent: true,
      },
      {
        source: "/servicios/grietas",
        destination: "/reparacion-estructural-panama",
        permanent: true,
      },
      {
        source: "/servicios/piscinas",
        destination: "/impermeabilizacion-panama",
        permanent: true,
      },
      ...apexHostRedirects,
      ...legacyHostRedirects,
    ];
  },
};

export default nextConfig;
