import { Comment } from '@domain/entities/Comment';
import { ICharacterCacheRepo } from '@domain/repositories/ICharacterCacheRepo';
import { ICommentRepo } from '@domain/repositories/ICommentRepo';

export class CreateComment {
    constructor(
        private readonly commentRepository: ICommentRepo,
        private readonly characterCacheRepository: ICharacterCacheRepo,
    ) {}

    async execute(item: Comment) {
        const comment = await this.commentRepository.create(item);
        await this.characterCacheRepository.deleteCharacterById(
            item.getCharacterId()!,
        );
        return comment;
    }
}
