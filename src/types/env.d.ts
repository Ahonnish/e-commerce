declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: 'local' | 'staging' | 'production' | 'development' | 'test';
    PORT?: string;
    MONGO_URI?: string;
    JWT_SECRET?: string;
    JWT_EXPIRES_IN?: string;
    BCRYPT_SALT_ROUNDS?: string;
  }
}

export {};
