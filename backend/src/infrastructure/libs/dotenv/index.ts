import dotenv from 'dotenv';

dotenv.config();

const getEnvVar = (key: string) => {
    const value = process.env[key];
    if (!value) throw new Error(`Missing env var: ${key}`);
    return value;
};

export const env = {
    dbName: getEnvVar('DB_NAME'),
    dbUser: getEnvVar('DB_USERNAME'),
    dbPassword: getEnvVar('DB_PASSWORD'),
    dbHost: getEnvVar('DB_HOST'),
    redisUrl: getEnvVar('REDIS_URL'),
    externalCharactersAPIBaseUrl: getEnvVar('EXTERNAL_CHARACTERS_API_BASE_URL'),
};
