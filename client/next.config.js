/* eslint-disable comma-dangle */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: [
      'cdn.idropnews.com',
      'www.shortform.com',
      'www.simplilearn.com',
      'images.unsplash.com',
      'campustechnology.com',
      'res.cloudinary.com',
      'lh3.googleusercontent.com',
    ],
  },
};

module.exports = nextConfig;
