import { Query, Resolver } from 'type-graphql';
import { Character } from '../types/Character';

@Resolver()
export class CharacterResolver {
    @Query((_returns) => [Character])
    async characters() {
        return [];
    }
}
