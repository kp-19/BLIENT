/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'w7.pngwing.com', // replace with the domain of your image URLs
            pathname: '/**', // adjust the path if needed, or use '/**' for all paths
          },
        ],
      },
};

export default nextConfig;