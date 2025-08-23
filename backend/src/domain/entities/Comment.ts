export interface IComment {
    id?: number;
    content: string;
    characterId?: number;
}

export class Comment {
    private id?: number;
    private content: string;
    private characterId?: number;

    constructor(item: IComment) {
        this.id = item.id;
        this.content = item.content;
        this.characterId = item.characterId;
    }

    getId() {
        return this.id;
    }

    getContent() {
        return this.content;
    }

    getCharacterId() {
        return this.characterId;
    }
}
