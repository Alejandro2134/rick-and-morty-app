import { Comment } from '@domain/entities/Comment';

export interface ICommentRepo {
    create(item: Comment): Promise<Comment>;
}
