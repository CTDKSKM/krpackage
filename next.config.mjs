/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev, isServer }) => {
    // 클라이언트 사이드 빌드에서만 적용
    if (!isServer) {
      config.watchOptions = {
        ignored: ['**/node_modules', '**/.next'],
        aggregateTimeout: 300,
        poll: 2000,
      }
    }
    return config
  },
};

export default nextConfig;
