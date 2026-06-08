import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  ...(isGithubPages && {
    output: 'export',
    basePath: '/projeto-soli-deo-gloria',
    excludeDefaultMomentLocales: true,
  }),
};

export default nextConfig;
