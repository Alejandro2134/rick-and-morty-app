import { Sequelize } from 'sequelize-typescript';
import { ORM } from '../interfaces/ORM';
import { Character } from './models/Character';
import { Comment } from './models/Comment';
import { env } from '@infrastructure/libs/dotenv';

export class SequelizeORM implements ORM {
    private sequelize: Sequelize;

    constructor() {
        this.sequelize = new Sequelize({
            dialect: 'postgres',
            host: env.dbHost,
            port: 5432,
            username: env.dbUser,
            password: env.dbPassword,
            database: env.dbName,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
            models: [Character, Comment],
        });
    }

    async connect(): Promise<void> {
        await this.sequelize.authenticate();
    }
}
