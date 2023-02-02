/** @type {import('next').NextConfig} */

const withNextra = require("nextra")({
  theme: "./src/components/layout.tsx",
  themeConfig: "./theme.config.ts",
});

module.exports = withNextra({
  reactStrictMode: true,
});
