import { ICommentResponseDTO } from './CommentDTO';

interface ICharacterResponseDTO {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    origin: string;
    image: string;
    is_favorite: boolean;
}

export class CharacterResponseDTO {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    origin: string;
    image: string;
    is_favorite: boolean;
    comments: ICommentResponseDTO[];

    constructor(item: ICharacterResponseDTO) {
        this.id = item.id;
        this.name = item.name;
        this.status = item.status;
        this.species = item.species;
        this.gender = item.gender;
        this.origin = item.origin;
        this.image = item.image;
        this.is_favorite = item.is_favorite;
        this.comments = [];
    }

    setComment(comment: ICommentResponseDTO) {
        this.comments.push(comment);
    }
}
