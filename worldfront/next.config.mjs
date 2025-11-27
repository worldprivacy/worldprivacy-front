/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/questions',
                destination: 'http://localhost:8080/src/Infrastructure/Api/GetRandomQuestionsController.php',
            },
        ];
    },
};

export default nextConfig;