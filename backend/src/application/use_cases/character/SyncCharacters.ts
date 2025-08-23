import { IExternalCharacterRepo } from '@domain/repositories/IExternalCharacterRepo';
import { ICharacterRepo } from '@domain/repositories/ICharacterRepo';

export class SyncCharacters {
    constructor(
        private externalCharacterRepository: IExternalCharacterRepo,
        private characterRepository: ICharacterRepo,
    ) {}

    async execute() {
        const externalCharacters =
            await this.externalCharacterRepository.getExternalCharacters();

        await this.characterRepository.buklkCreate(externalCharacters);
    }
}
