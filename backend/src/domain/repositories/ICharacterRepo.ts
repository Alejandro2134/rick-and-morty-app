import {
    Character,
    ICharacterUpdate,
    ICharacterFilters,
} from '@domain/entities/Character';

export interface ICharacterRepo {
    getAll(filters: ICharacterFilters): Promise<Character[]>;
    buklkCreate(characters: Character[]): Promise<Character[]>;
    getById(id: number): Promise<Character | null>;
    updateById(id: number, item: ICharacterUpdate): Promise<Character | null>;
}
