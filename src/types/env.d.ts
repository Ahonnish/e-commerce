declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: 'local' | 'development' | 'test' | 'staging' | 'production';
    PORT?: string;
    MONGO_URI?: string;
    JWT_SECRET?: string;
    JWT_EXPIRES_IN?: string;
    JWT_AUDIENCE?: string;
    JWT_ISSUER?: string;
    BCRYPT_SALT_ROUNDS?: string;
  }
}

export {};
