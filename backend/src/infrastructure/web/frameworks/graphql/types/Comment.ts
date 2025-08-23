import { Field, ObjectType, ID, InputType, Int } from 'type-graphql';

@ObjectType()
export class Comment {
    @Field((type) => ID)
    id!: number;

    @Field()
    content!: string;
}

@InputType()
export class CommentCreate {
    @Field(() => Int)
    character_id!: number;

    @Field()
    content!: string;
}
