import { IComment } from './Comment';

interface ICharacter {
    id?: number;
    status: string;
    species: string;
    gender: string;
    name: string;
    origin: string;
    image: string;
    externalId: number;
    isFavorite: boolean;
    comments?: IComment[];
}

export interface ICharacterFilters {
    [filter: string]: string | undefined;
    status?: string;
    species?: string;
    gender?: string;
    name?: string;
    origin?: string;
}

export interface ICharacterUpdate {
    [filter: string]: undefined | boolean;
    isFavorite?: boolean;
}

export class Character {
    private id?: number;
    private status: string;
    private species: string;
    private gender: string;
    private name: string;
    private origin: string;
    private image: string;
    private externalId: number;
    private isFavorite: boolean;
    private comments: IComment[];

    constructor(item: ICharacter) {
        this.id = item.id;
        this.status = item.status;
        this.species = item.species;
        this.gender = item.gender;
        this.name = item.name;
        this.origin = item.origin;
        this.image = item.image;
        this.externalId = item.externalId;
        this.isFavorite = item.isFavorite;
        this.comments = [];
    }

    getStatus() {
        return this.status;
    }

    getSpecies() {
        return this.species;
    }

    getGender() {
        return this.gender;
    }

    getName() {
        return this.name;
    }

    getOrigin() {
        return this.origin;
    }

    getImage() {
        return this.image;
    }

    getExternalId() {
        return this.externalId;
    }

    getIsFavorite() {
        return this.isFavorite;
    }

    getId() {
        return this.id;
    }

    setComment(comment: IComment) {
        this.comments.push(comment);
    }

    getComments() {
        return this.comments;
    }
}
