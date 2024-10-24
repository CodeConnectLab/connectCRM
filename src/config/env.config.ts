export const envConfig = {
    mongodb: {
      uri: process.env.MONGO_URI || 'mongodb://localhost:27017/nextcrm',
    },
    jwt: {
      sessionSecret: process.env.SESSION_SECRET || 'your_jwt_secret',
      refreshSecret: process.env.REFRESH_SECRET || 'your_refresh_jwt_secret',
    },
    isProduction: process.env.NODE_ENV === 'production',
  };