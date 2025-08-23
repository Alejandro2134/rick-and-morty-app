import {
    Column,
    CreatedAt,
    DeletedAt,
    HasMany,
    Model,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';
import { Comment } from './Comment';

export interface ICharacterModel {
    character_id?: number;
    status: string;
    species: string;
    gender: string;
    name: string;
    origin: string;
    external_id: number;
    is_favorite: boolean;
}

@Table({ tableName: 'characters', paranoid: true })
export class Character extends Model {
    @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
    declare character_id: number;

    @Column({ allowNull: false })
    declare status: string;

    @Column({ allowNull: false })
    declare species: string;

    @Column({ allowNull: false })
    declare gender: string;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare origin: string;

    @Column({ allowNull: false })
    declare image: string;

    @Column({ allowNull: false, unique: true })
    declare external_id: number;

    @Column({ allowNull: false, defaultValue: false })
    declare is_favorite: boolean;

    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare updated_at: Date;

    @DeletedAt
    declare deleted_at: Date | null;

    @HasMany(() => Comment)
    declare comments: Comment[];
}
