import { CacheStore } from '../interfaces/CacheStore';
import { createClient, RedisClientType } from 'redis';
import { Service } from 'typedi';
import { env } from '@infrastructure/libs/dotenv';

@Service()
export class Redis implements CacheStore {
    private readonly redisClient: RedisClientType;

    constructor() {
        this.redisClient = createClient({
            url: env.redisUrl,
        });
    }

    async get<T>(key: string): Promise<T | null> {
        const value = await this.redisClient.get(key);
        return value ? JSON.parse(value) : null;
    }

    async set<T>(key: string, value: T, ttl = 3600): Promise<void> {
        await this.redisClient.set(key, JSON.stringify(value), {
            expiration: {
                type: 'EX',
                value: ttl,
            },
        });
    }

    async del(key: string): Promise<void> {
        await this.redisClient.del(key);
    }

    async connect(): Promise<void> {
        await this.redisClient.connect();
    }
}
