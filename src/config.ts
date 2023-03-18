const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/myapp',
  jwtSecret: process.env.JWT_SECRET || 'mysecretkey',  
  jwtexpirationtime : process.env.JWT_EXPIRATION_TIME || '1h'
};

export default config;
