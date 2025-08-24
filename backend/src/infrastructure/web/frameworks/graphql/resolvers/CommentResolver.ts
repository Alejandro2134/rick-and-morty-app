import { Mutation, Resolver, Arg } from 'type-graphql';
import { Service } from 'typedi';
import { Comment, CommentCreate } from '../types/Comment';
import { CommentMapper } from '@application/mappers/CommentMapper';
import { CreateComment } from '@application/use_cases/comment/CreateComment';
import { CommentRepoImpl } from '@infrastructure/persistency/orm/sequelize/implementations/CommentRepoImpl';
import { CharacterCacheRepoImpl } from '@infrastructure/persistency/cache/redis/implementations/CharacterCacheRepoImpl';

@Service()
@Resolver()
export class CommentResolver {
    private readonly commentMapper = new CommentMapper();
    private readonly createComment: CreateComment;

    constructor(
        private readonly commentRepoImpl: CommentRepoImpl,
        private readonly characterCacheRepoImpl: CharacterCacheRepoImpl,
    ) {
        this.createComment = new CreateComment(
            commentRepoImpl,
            characterCacheRepoImpl,
        );
    }

    @Mutation((_returns) => Comment)
    async create(@Arg('data') data: CommentCreate) {
        const entity = this.commentMapper.fromDTOToEntity(data);
        const res = await this.createComment.execute(entity);
        return this.commentMapper.fromEntityToDTO(res);
    }
}
