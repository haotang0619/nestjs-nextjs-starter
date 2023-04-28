//@ts-check

const { withNx } = require('@nrwl/next/plugins/with-nx');

// Analyze bundles on local build
const withBundleAnalyzer =
  process.env.ANALYZE === 'true'
    ? require('@next/bundle-analyzer')()
    : (x) => x;

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = () => {
  const plugins = [withNx, withBundleAnalyzer];
  return plugins.reduce((acc, plugin) => plugin(acc), nextConfig);
};
