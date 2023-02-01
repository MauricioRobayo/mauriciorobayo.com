/** @type {import('next').NextConfig} */

const withNextra = require("nextra")({
  theme: "./src/components/layout.tsx",
  themeConfig: "./theme.config.js",
});

module.exports = withNextra({
  reactStrictMode: true,
});
