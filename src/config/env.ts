import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import { z } from 'zod';
import logger from '../utils/logger';

const loadEnvironment = (): void => {
  const nodeEnv = process.env.NODE_ENV || 'local';
  const envFile = path.resolve(process.cwd(), `.env.${nodeEnv}`);

  if (fs.existsSync(envFile)) {
    dotenv.config({ path: envFile });
    return;
  }

  dotenv.config();
};

loadEnvironment();

const envSchema = z.object({
  NODE_ENV: z
    .enum(['local', 'staging', 'production', 'development', 'test'])
    .default('local'),
  PORT: z.coerce.number().int().positive().default(3000),
  MONGO_URI: z.string().min(1, 'MONGO_URI is required'),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
  JWT_EXPIRES_IN: z.coerce.number().int().positive().default(86400),
  BCRYPT_SALT_ROUNDS: z.coerce.number().int().positive().default(10),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  throw new Error(
    `Invalid environment configuration: ${JSON.stringify(parsedEnv.error.flatten().fieldErrors)}`
  );
}

const env = parsedEnv.data;

type RuntimeEnvironment = 'local' | 'staging' | 'production';

const environment: RuntimeEnvironment =
  env.NODE_ENV === 'staging' || env.NODE_ENV === 'production'
    ? env.NODE_ENV
    : 'local';

logger.info(`Environment loaded: ${environment}`);

export type EnvConfig = z.infer<typeof envSchema>;
export type { RuntimeEnvironment };
export { env, environment };
