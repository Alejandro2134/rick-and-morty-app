import { Comment } from '@domain/entities/Comment';
import { ICommentRepo } from '@domain/repositories/ICommentRepo';
import { Service } from 'typedi';
import {
    Comment as CommentModel,
    ICommentModel,
} from '@infrastructure/persistency/orm/sequelize/models/Comment';
import { Optional } from 'sequelize';

@Service()
export class CommentRepoImpl implements ICommentRepo {
    async create(item: Comment): Promise<Comment> {
        const characterModel = this.fromDomainToModel(item);
        const res = await CommentModel.create(characterModel);
        return this.fromModelToDomain(res);
    }

    private fromModelToDomain(model: CommentModel): Comment {
        return new Comment({
            content: model.content,
            id: model.comment_id,
            characterId: model.character_id,
        });
    }

    private fromDomainToModel(domain: Comment): Optional<ICommentModel, any> {
        return {
            content: domain.getContent(),
            character_id: domain.getCharacterId(),
        };
    }
}
