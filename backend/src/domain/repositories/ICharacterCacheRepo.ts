import { Character } from '@domain/entities/Character';

export interface ICharacterCacheRepo {
    getCharacterList(hash: string): Promise<Character[] | null>;
    setCharacterList(
        hash: string,
        data: Character[],
        ttl: number,
    ): Promise<void>;
    setCharacterById(id: number, data: Character): Promise<void>;
    getCharacterById(id: number): Promise<Character | null>;
    deleteCharacterById(id: number): Promise<void>;
}
