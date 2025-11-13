// Analyze bundles on local build
const getWrapper = async () => {
  if (process.env.ANALYZE === 'true') {
    const { default: NextBundleAnalyzer } = await import('@next/bundle-analyzer');
    return NextBundleAnalyzer();
  }
  return (x) => x;
};

const withBundleAnalyzer = await getWrapper();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { optimizePackageImports: ['iconsax-react'] },
  reactStrictMode: true,
  swcMinify: true,
};

export default withBundleAnalyzer(nextConfig);
