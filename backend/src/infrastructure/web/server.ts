import { SyncCharacters } from '@application/use_cases/character/SyncCharacters';
import { ExternalCharactersRepoImpl } from '@infrastructure/integrations/characters/adapters/ExternalCharactersRepoImpl';
import { Axios } from '@infrastructure/libs/axios';
import { CacheStore } from '@infrastructure/persistency/cache/interfaces/CacheStore';
import { ORM } from '@infrastructure/persistency/orm/interfaces/ORM';
import { WebFramework } from '@infrastructure/web/interfaces/WebFramework';
import { env } from '@infrastructure/libs/dotenv';
import { CharacterRepoImpl } from '@infrastructure/persistency/orm/sequelize/implementations/CharacterRepoImpl';

export class Server {
    private webFramework: WebFramework;
    private orm: ORM;
    private cacheStore: CacheStore;

    constructor(webFramework: WebFramework, orm: ORM, cacheStore: CacheStore) {
        this.webFramework = webFramework;
        this.orm = orm;
        this.cacheStore = cacheStore;
    }

    async start() {
        await this.orm.connect();
        await this.populateDB();
        await this.cacheStore.connect();
        await this.webFramework.start();
    }

    private async populateDB() {
        const axios = new Axios(env.externalCharactersAPIBaseUrl);
        const externalCharacterImpl = new ExternalCharactersRepoImpl(axios);
        const characterImpl = new CharacterRepoImpl();
        const syncCharactersUseCase = new SyncCharacters(
            externalCharacterImpl,
            characterImpl,
        );

        await syncCharactersUseCase.execute();
    }
}
