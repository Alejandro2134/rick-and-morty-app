import {
    Column,
    CreatedAt,
    Table,
    DataType,
    ForeignKey,
    Model,
} from 'sequelize-typescript';
import { Character } from './Character';

@Table({ tableName: 'comments' })
export class Comment extends Model {
    @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
    declare comment_id: number;

    @ForeignKey(() => Character)
    @Column({ allowNull: false })
    declare character_id: number;

    @Column({ allowNull: false, type: DataType.TEXT })
    declare content: string;

    @CreatedAt
    declare created_at: Date;
}
