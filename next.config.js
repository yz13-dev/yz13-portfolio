/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizeServerReact: true,
        serverMinification: true,
        optimizePackageImports: [ 'react-icons', 'react', 'next' ]
    },
    images: {
        domains: ['cdn.darkmaterial.space']
    }
}

module.exports = nextConfig
