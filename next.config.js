/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizeServerReact: true,
        serverMinification: true,
        optimizePackageImports: [ 'react-icons', 'react' ]
    },
    images: {
        domains: ['cdn.darkmaterial.space']
    }
}

module.exports = nextConfig
