/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'media.formula1.com',
            },
            {
                protocol:'https',
                hostname:"fueler.store",
            },
            {
                protocol:"https",
                hostname:"www.progcovers.com"
            }
        ]
    }
};

export default nextConfig;
