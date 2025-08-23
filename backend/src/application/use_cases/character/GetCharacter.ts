import { Character } from '@domain/entities/Character';
import { ICharacterCacheRepo } from '@domain/repositories/ICharacterCacheRepo';
import { ICharacterRepo } from '@domain/repositories/ICharacterRepo';

export class GetCharacter {
    constructor(
        private characterRepository: ICharacterRepo,
        private characterCacheRepository: ICharacterCacheRepo,
    ) {}

    async execute(id: number) {
        const cachedCharacter =
            await this.characterCacheRepository.getCharacterById(id);

        if (!cachedCharacter) {
            const character = await this.characterRepository.getById(id);

            if (!character)
                throw new Error('Character with provided id dont exist');

            await this.characterCacheRepository.setCharacterById(id, character);
            return character;
        }

        return cachedCharacter;
    }
}
