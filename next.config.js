/** @type {import('next').NextConfig} */

const withNextra = require("nextra")({
  theme: "./components/theme.tsx",
});

module.exports = withNextra({
  reactStrictMode: true,
});
