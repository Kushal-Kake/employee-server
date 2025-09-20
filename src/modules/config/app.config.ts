const loadDefaultConfiguration = () => ({
  port: parseInt(process.env.API_PORT ?? '4000'),
  host: process.env.API_HOST ?? 'localhost',
  isDevEnv: (process.env.API_NODE_ENV ?? 'development') === 'development',
  jwtSecret: process.env.JWT_SECRET ?? 'akdjflsdfj;lkadf',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '15m',
});

const loadDataBaseConfiguration = () => ({
  database: {
    name: process.env.API_DB_NAME ?? '',
    username: process.env.API_DB_USR_NAME ?? '',
    password: process.env.API_DB_PASSWD ?? '',
    port: parseInt(process.env.API_DB_PORT ?? '5432'),
    host: process.env.API_DB_HOST ?? 'localhost',
    entityPattern:
      process.env.API_DB_ENTITY_PATTERN ?? './src/entities/**/*-entity.ts',
  },
});

const loadCorsConfiguration = () => ({
  cors: {
    allowedHeaders: process.env.API_CORS_ALLOWED_HEADERS ?? '*',
    origin: process.env.API_CORS_ORIGIN ?? '*',
    credentials: (process.env.API_CORS_CREDENTIALS ?? 'false') === 'true',
  },
});

export {
  loadCorsConfiguration,
  loadDataBaseConfiguration,
  loadDefaultConfiguration,
};
