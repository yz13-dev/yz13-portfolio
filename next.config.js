/** @type {import('next').NextConfig} */
const nextConfig = {
    compress: true,
    optimizeFonts: true,
    experimental: {
        optimizeServerReact: true,
        serverMinification: true,
        optimizePackageImports: [ 'react-icons', 'react', 'next' ],
        optimizeCss: true,
        gzipSize: true
    },
    images: {
        domains: ['cdn.darkmaterial.space']
    }
}

module.exports = nextConfig
