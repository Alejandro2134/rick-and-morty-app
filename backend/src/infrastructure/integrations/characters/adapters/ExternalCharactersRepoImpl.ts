import { Character } from '@domain/entities/Character';
import { IExternalCharacterRepo } from '@domain/repositories/IExternalCharacterRepo';
import { HttpClient } from '@infrastructure/libs/interfaces/HttpClient';
import { GetCharactersRes, IResults } from '../api/GetCharactersRes';

export class ExternalCharactersRepoImpl implements IExternalCharacterRepo {
    private readonly httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    async getExternalCharacters(): Promise<Character[]> {
        const externalCharacters =
            await this.httpClient.get<GetCharactersRes>('/character');

        return externalCharacters.results.map(
            this.fromExternalCharactersToDomain,
        );
    }

    private fromExternalCharactersToDomain(
        externalCharacter: IResults,
    ): Character {
        return new Character({
            externalId: externalCharacter.id,
            gender: externalCharacter.gender,
            image: externalCharacter.image,
            name: externalCharacter.name,
            origin: externalCharacter.origin.name,
            species: externalCharacter.species,
            status: externalCharacter.status,
            isFavorite: false,
        });
    }
}
