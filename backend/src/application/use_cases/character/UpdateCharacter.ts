import { ICharacterUpdate } from '@domain/entities/Character';
import { ICharacterRepo } from '@domain/repositories/ICharacterRepo';
import { GetCharacter } from './GetCharacter';
import { ICharacterCacheRepo } from '@domain/repositories/ICharacterCacheRepo';

export class UpdateCharacter {
    private getCharacter: GetCharacter;

    constructor(
        private readonly characterRepository: ICharacterRepo,
        private characterCacheRepository: ICharacterCacheRepo,
    ) {
        this.getCharacter = new GetCharacter(
            characterRepository,
            characterCacheRepository,
        );
    }

    async execute(id: number, item: ICharacterUpdate) {
        await this.getCharacter.execute(id);
        const character = await this.characterRepository.updateById(id, item);
        if (!character) throw new Error('Error updating character');

        await this.characterCacheRepository.deleteCharacterById(id);

        return character;
    }
}
