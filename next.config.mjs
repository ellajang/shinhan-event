    /** @type {import('next').NextConfig} */
    const nextConfig = {
    reactStrictMode: true,
    output: 'export', // 여기 추가
    images: { // 빌드시 오류가 나면 여기도 추가
      unoptimized: true,
      },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
    ];
  },
    };
    export default nextConfig;
