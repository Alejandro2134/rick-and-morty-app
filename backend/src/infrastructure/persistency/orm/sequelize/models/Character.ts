import {
    Column,
    CreatedAt,
    DeletedAt,
    Model,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';

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

    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare updated_at: Date;

    @DeletedAt
    declare deleted_at: Date | null;
}
