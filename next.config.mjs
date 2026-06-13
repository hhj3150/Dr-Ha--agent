/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The /api/chat route reads agent + context markdown from the repo root at
  // runtime, so keep Node.js as the runtime (configured per-route).
};

export default nextConfig;
