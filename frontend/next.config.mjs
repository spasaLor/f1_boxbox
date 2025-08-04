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
            },
            {
                protocol:"https",
                hostname:"res.cloudinary.com"
            }
        ]
    }
};

export default nextConfig;
