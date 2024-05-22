/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        requireEmailVerification: process.env.REQUIRE_EMAIL_VERIFICATION
    }
};

export default nextConfig;
