export interface ICommentResponseDTO {
    id: number;
    content: string;
}

export class CommentResponseDTO {
    id: number;
    content: string;

    constructor(item: ICommentResponseDTO) {
        this.id = item.id;
        this.content = item.content;
    }
}

interface ICommentCreateDTO {
    content: string;
    character_id: number;
}

export class CommentCreateDTO {
    content: string;
    character_id: number;

    constructor(item: ICommentCreateDTO) {
        this.character_id = item.character_id;
        this.content = item.content;
    }
}
