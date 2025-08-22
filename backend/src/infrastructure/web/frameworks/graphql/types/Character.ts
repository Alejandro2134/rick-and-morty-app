import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Character {
    @Field((type) => ID)
    id!: number;

    @Field()
    name!: string;

    @Field()
    status!: string;

    @Field()
    species!: string;

    @Field()
    gender!: string;

    @Field()
    origin!: string;

    @Field()
    image!: string;
}
