import { Character } from '@domain/entities/Character';

export interface IExternalCharacterRepo {
    getExternalCharacters(): Promise<Character[]>;
}
