import { Sequelize } from 'sequelize-typescript';
import { ORM } from '../interfaces/ORM';
import { Character } from './models/Character';
import { Comment } from './models/Comment';

export class SequelizeORM implements ORM {
    private sequelize: Sequelize;

    constructor() {
        this.sequelize = new Sequelize({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'password',
            database: 'rick_and_morty_db',
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
