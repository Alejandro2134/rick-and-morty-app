import { Comment } from '@domain/entities/Comment';
import { ICommentRepo } from '@domain/repositories/ICommentRepo';

export class CreateComment {
    constructor(private readonly commentRepository: ICommentRepo) {}

    async execute(item: Comment) {
        return await this.commentRepository.create(item);
    }
}
