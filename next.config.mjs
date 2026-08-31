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
    // Host redirects only fire if DNS for the old domain points at this Vercel
    // project. They do not match sedeco.lat / www.sedeco.lat.
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
      ...legacyHostRedirects,
    ];
  },
};

export default nextConfig;
