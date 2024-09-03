// src/config.js
const env = process.env.NODE_ENV; // 'development' or 'production'

const config = {
  development: {
    backendUrl: "http://localhost:8000",
  },
  production: {
    backendUrl: "https://your-production-url.com",
  },
};

export default config[env];
