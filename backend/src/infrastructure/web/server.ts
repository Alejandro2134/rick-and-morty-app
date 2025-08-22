import { ORM } from '@infrastructure/persistency/orm/interfaces/ORM';
import { WebFramework } from '@infrastructure/web/interfaces/WebFramework';

export class Server {
    private webFramework: WebFramework;
    private orm: ORM;

    constructor(webFramework: WebFramework, orm: ORM) {
        this.webFramework = webFramework;
        this.orm = orm;
    }

    async start() {
        await this.orm.connect();
        await this.webFramework.start();
    }
}
