import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    devIndicators: process.env.NODE_ENV !== 'production' ? { position: 'bottom-left' } : false,
    trailingSlash: true,
    // reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'test.pentademo.com.tr',
                pathname: '/storage/**',
            },
        ],
    },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);