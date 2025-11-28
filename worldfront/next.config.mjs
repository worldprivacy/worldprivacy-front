/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/questions',
                destination: 'http://localhost:8080/question/list-random',
            },
            {
                source: '/api/countries',
                destination: 'http://localhost:8080/pays/list',
            },
        ];
    },
};

export default nextConfig;