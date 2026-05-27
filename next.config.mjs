import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      ...(process.env.R2_PUBLIC_URL
        ? [
            {
              protocol: 'https',
              hostname: new URL(process.env.R2_PUBLIC_URL).hostname,
            },
          ]
        : []),
    ],
  },
  async redirects() {
    return [
      {
        source: '/portfolio',
        destination: '/',
        permanent: false,
      },
      {
        source: '/portfolio/:path*',
        destination: '/',
        permanent: false,
      },
    ]
  },
}

export default withPayload(nextConfig)
