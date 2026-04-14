/** @type {import('next').NextConfig} */
module.exports = {
  compiler: { styledComponents: true },
  images: { remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }] },
};
