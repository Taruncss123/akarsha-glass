/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Yeh kisi bhi website ki image ko allow kar dega
      },
    ],
  },
};

export default nextConfig;