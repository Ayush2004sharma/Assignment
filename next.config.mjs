/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  allowedDevOrigins: [
    'http://192.168.29.91:3000',
    'http://localhost:3000',
    '192.168.29.91'
  ],
};

export default nextConfig;