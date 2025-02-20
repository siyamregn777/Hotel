import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['drive.google.com', 'res.cloudinary.com'], // Add Cloudinary to allowed domains
  },
};

export default withNextVideo(nextConfig, { folder: 'public/videos' });
