interface IGetCharacterRes {
    info: IInfo;
    results: IResults[];
}

interface IInfo {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
}

export interface IResults {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
}

export class GetCharactersRes {
    info: IInfo;
    results: IResults[];

    constructor(item: IGetCharacterRes) {
        this.info = item.info;
        this.results = item.results;
    }
}
