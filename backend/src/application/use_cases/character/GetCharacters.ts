import { ICharacterFilters } from '@domain/entities/Character';
import { ICharacterCacheRepo } from '@domain/repositories/ICharacterCacheRepo';
import { ICharacterRepo } from '@domain/repositories/ICharacterRepo';
import { ISecurityUtilsRepo } from '@domain/repositories/ISecurityUtilsRepo';

export class GetCharacters {
    constructor(
        private readonly characterRepository: ICharacterRepo,
        private readonly securityUtilsRepository: ISecurityUtilsRepo,
        private readonly characterCacheRepository: ICharacterCacheRepo,
    ) {}

    async execute(filters: ICharacterFilters) {
        const hash = this.securityUtilsRepository.generateHash(
            'md5',
            JSON.stringify(filters),
        );
        const cachedCharacters =
            await this.characterCacheRepository.getCharacterList(hash);

        if (!cachedCharacters) {
            const characters = await this.characterRepository.getAll(filters);
            console.log(characters);
            this.characterCacheRepository.setCharacterList(
                hash,
                characters,
                300,
            );

            return characters;
        }

        return cachedCharacters;
    }
}
