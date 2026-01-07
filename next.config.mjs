/** @type {import('next').NextConfig} */
const nextConfig = {
  // (Tailwind only) no styled-components compiler needed
  webpack: (config, { dev }) => {
    // Windows 환경에서 webpack pack cache rename(EPERM/ENOENT)로 dev가 깨지는 케이스가 있어
    // dev에선 filesystem cache를 끕니다.
    if (dev) {
      config.cache = false
    }
    return config
  },
}

export default nextConfig
