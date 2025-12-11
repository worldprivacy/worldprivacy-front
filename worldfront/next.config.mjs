/** @type {import('next').NextConfig} */
const apiUrl = process.env.URL_API;
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/questions',
                destination: apiUrl+'/question/list-random',
            },
            {
                source: '/api/countries',
                destination: apiUrl+'/pays/list',
            },
        ];
    },
};

export default nextConfig;