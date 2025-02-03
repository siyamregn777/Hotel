//next.config.ts
import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['drive.google.com'], 
  },
};

export default withNextVideo(nextConfig, { folder: 'public/videos' });