// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   eslint: {
//     ignoreDuringBuilds: true, // Keep your previous setting
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "res.cloudinary.com",
//         port: "",
//         pathname: "/**", // Allow all images from Cloudinary
//       },
//     ],
//   },
// };

// export default nextConfig;












// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   eslint: {
//     ignoreDuringBuilds: true,
//   },

//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "res.cloudinary.com",
//         port: "",
//         pathname: "/**",
//       },
//     ],
//   },

//   // *** REQUIRED FOR ESC/POS PACKAGES ***
//   experimental: {
//     serverComponentsExternalPackages: [
//       "escpos-encoder",
//       "pngjs"
//     ],
//   },
// };

// export default nextConfig;













/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  experimental: {
    // 🚫 DISABLE Typed Route Types (THIS FIXES YOUR ERROR)
    typedRoutes: false,

    // your existing printer packages
    serverComponentsExternalPackages: [
      "escpos-encoder",
      "pngjs"
    ],
  },
};

export default nextConfig;
