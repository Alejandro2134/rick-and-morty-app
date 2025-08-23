import { ICharacterCacheRepo } from '@domain/repositories/ICharacterCacheRepo';
import { Service } from 'typedi';
import { Redis } from '..';
import { Character } from '@domain/entities/Character';
import { ICacheCharacter } from '../models/character';

@Service()
export class CharacterCacheRepoImpl implements ICharacterCacheRepo {
    private readonly characterKeyPrefix = 'character:id:';
    private readonly listKeyPrefix = 'character:list:';

    constructor(private readonly redisClient: Redis) {}

    async getCharacterList(hash: string): Promise<Character[] | null> {
        const cachedCharacters = await this.redisClient.get<ICacheCharacter[]>(
            `${this.listKeyPrefix}${hash}`,
        );

        if (!cachedCharacters) return null;
        return cachedCharacters.map(this.fromModelToDomain);
    }

    async setCharacterList(
        hash: string,
        data: Character[],
        ttl: number,
    ): Promise<void> {
        const model = data.map(this.fromDomainToModel);

        await this.redisClient.set<ICacheCharacter[]>(
            `${this.listKeyPrefix}${hash}`,
            model,
            ttl,
        );
    }

    async setCharacterById(id: number, data: Character): Promise<void> {
        const model = this.fromDomainToModel(data);

        await this.redisClient.set<ICacheCharacter>(
            `${this.characterKeyPrefix}${id}`,
            model,
            3600,
        );
    }

    async getCharacterById(id: number): Promise<Character | null> {
        const cachedCharacter = await this.redisClient.get<ICacheCharacter>(
            `${this.characterKeyPrefix}${id}`,
        );

        if (!cachedCharacter) return null;
        return this.fromModelToDomain(cachedCharacter);
    }

    async deleteCharacterById(id: number): Promise<void> {
        await this.redisClient.del(`${this.characterKeyPrefix}${id}`);
    }

    private fromDomainToModel(domain: Character): ICacheCharacter {
        return {
            gender: domain.getGender(),
            image: domain.getImage(),
            id: domain.getId()!,
            is_favorite: domain.getIsFavorite(),
            name: domain.getName(),
            species: domain.getSpecies(),
            status: domain.getStatus(),
            origin: domain.getOrigin(),
            comments: domain.getComments().map((comment) => ({
                id: comment.id!,
                content: comment.content,
            })),
            externalId: domain.getExternalId(),
        };
    }

    private fromModelToDomain(model: ICacheCharacter): Character {
        const character = new Character({
            externalId: model.externalId,
            gender: model.gender,
            image: model.image,
            isFavorite: model.is_favorite,
            name: model.name,
            origin: model.origin,
            species: model.species,
            status: model.status,
            id: model.id,
        });

        model.comments.map((comment) => {
            character.setComment({
                content: comment.content,
                id: comment.id,
            });
        });

        return character;
    }
}
