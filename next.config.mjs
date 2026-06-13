/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The /api/chat route reads agent + context markdown from the repo root at
  // runtime (fs.readFile). Next.js cannot trace these dynamic reads on its own,
  // so on serverless hosts (Netlify, Vercel) the files would be missing from the
  // function bundle. Explicitly include them so they ship with the function.
  experimental: {
    outputFileTracingIncludes: {
      "/api/chat": ["./CLAUDE.md", "./agents/**/*", "./context/**/*"],
    },
  },
};

export default nextConfig;
