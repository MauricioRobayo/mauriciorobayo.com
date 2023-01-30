/** @type {import('next').NextConfig} */

const withNextra = require("nextra")({
  theme: "./theme",
});

module.exports = withNextra({
  reactStrictMode: true,
});
