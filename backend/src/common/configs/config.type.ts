export type Config = {
  app: AppConfig;
  database: DatabaseConfig;
  redis: RedisConfig;
  jwt: JWTConfig;
};

export type AppConfig = {
  port: number;
  host: string;
};

export type DatabaseConfig = {
  mongoUri: string;
};

export type RedisConfig = {
  port: number;
  host: string;
};

export type JWTConfig = {
  accessSecret: string;
  accessExpiresIn: string;
};
