import {
    Field,
    ID,
    InputType,
    ObjectType,
    registerEnumType,
} from 'type-graphql';
import { Comment } from './Comment';

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

    @Field()
    is_favorite!: boolean;

    @Field(() => [Comment])
    comments!: Comment[];
}

enum CharacterStatus {
    Alive = 'Alive',
    Dead = 'Dead',
    Unknown = 'unknown',
}

enum CharacterGender {
    Female = 'Female',
    Male = 'Male',
    Genderless = 'Genderless',
    Unknown = 'unknown',
}

registerEnumType(CharacterStatus, {
    name: 'CharacterStatus',
    description: 'The status of the character',
});

registerEnumType(CharacterGender, {
    name: 'CharacterGender',
    description: 'The gender of the character',
});

@InputType()
export class CharacterFilters {
    [filter: string]: string | undefined;

    @Field(() => CharacterStatus, { nullable: true })
    status?: CharacterStatus;

    @Field({ nullable: true })
    species?: string;

    @Field(() => CharacterGender, { nullable: true })
    gender?: CharacterGender;

    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    origin?: string;
}

@InputType()
export class CharacterUpdates {
    [filter: string]: boolean | undefined;

    @Field({ nullable: true })
    is_favorite?: boolean;
}
