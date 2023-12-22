/** @type {import('next').NextConfig} */
const nextConfig = {
    compress: true,
    optimizeFonts: true,
    modularizeImports: {
        "react-icons": {
            transform: "react-icons/{{member}}",
            preventFullImport: true
        }
    },
    experimental: {
        optimizeServerReact: true,
        serverMinification: true,
        optimizePackageImports: [ 'react-icons', 'react', 'next', 'framer-motion' ],
        optimizeCss: true,
        gzipSize: true
    },
    images: {
        domains: ['cdn.darkmaterial.space']
    }
}

module.exports = nextConfig
