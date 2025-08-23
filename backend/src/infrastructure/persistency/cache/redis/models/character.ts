export interface ICacheCharacter {
    id: number;
    status: string;
    species: string;
    gender: string;
    name: string;
    origin: string;
    image: string;
    is_favorite: boolean;
    externalId: number;
    comments: IComment[];
}

interface IComment {
    id: number;
    content: string;
}
