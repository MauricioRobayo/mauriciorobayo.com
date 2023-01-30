/** @type {import('next').NextConfig} */

const withNextra = require("nextra")({
  theme: "./src/components/layout.tsx",
});

module.exports = withNextra({
  reactStrictMode: true,
});
