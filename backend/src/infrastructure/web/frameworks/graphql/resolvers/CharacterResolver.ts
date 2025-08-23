import { Query, Resolver, Arg, Int, Mutation } from 'type-graphql';
import {
    Character,
    CharacterFilters,
    CharacterUpdates,
} from '../types/Character';
import { CharacterRepoImpl } from '@infrastructure/persistency/orm/sequelize/implementations/CharacterRepoImpl';
import { GetCharacters } from '@application/use_cases/character/GetCharacters';
import { Service } from 'typedi';
import { CharacterMapper } from '@application/mappers/CharacterMapper';
import { GetCharacter } from '@application/use_cases/character/GetCharacter';
import { UpdateCharacter } from '@application/use_cases/character/UpdateCharacter';
import { CharacterCacheRepoImpl } from '@infrastructure/persistency/cache/redis/implementations/CharacterCacheRepoImpl';
import { SecurityUtils } from '@infrastructure/utils/SecurityUtils';

@Service()
@Resolver()
export class CharacterResolver {
    private readonly characterMapper = new CharacterMapper();
    private readonly getCharacters: GetCharacters;
    private readonly getCharacter: GetCharacter;
    private readonly updateCharacter: UpdateCharacter;

    constructor(
        private readonly characterRepoImpl: CharacterRepoImpl,
        private readonly characterCacheRepoImpl: CharacterCacheRepoImpl,
        private readonly securityUils: SecurityUtils,
    ) {
        this.getCharacters = new GetCharacters(
            characterRepoImpl,
            securityUils,
            characterCacheRepoImpl,
        );
        this.getCharacter = new GetCharacter(
            characterRepoImpl,
            characterCacheRepoImpl,
        );
        this.updateCharacter = new UpdateCharacter(
            characterRepoImpl,
            characterCacheRepoImpl,
        );
    }

    @Query((_returns) => [Character])
    async characters(
        @Arg('filters', { nullable: false }) filters: CharacterFilters,
    ) {
        const res = await this.getCharacters.execute(filters);
        return res.map(this.characterMapper.fromDomainToDTO);
    }

    @Query((_returns) => Character)
    async character(@Arg('id', () => Int, { nullable: false }) id: number) {
        const res = await this.getCharacter.execute(id);
        return this.characterMapper.fromDomainToDTO(res);
    }

    @Mutation((_returns) => Character)
    async update(
        @Arg('id', () => Int, { nullable: false }) id: number,
        @Arg('updates', { nullable: false }) updates: CharacterUpdates,
    ) {
        const mappedUpdates =
            this.characterMapper.fromPartialDTOToPartialDomain(updates);
        const res = await this.updateCharacter.execute(id, mappedUpdates);
        return this.characterMapper.fromDomainToDTO(res);
    }
}
