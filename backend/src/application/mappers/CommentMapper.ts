import {
    CommentCreateDTO,
    CommentResponseDTO,
} from '@application/dto/CommentDTO';
import { Comment } from '@domain/entities/Comment';

export class CommentMapper {
    fromDTOToEntity(dto: CommentCreateDTO): Comment {
        return new Comment({
            content: dto.content,
            characterId: dto.character_id,
        });
    }

    fromEntityToDTO(entity: Comment): CommentResponseDTO {
        return new CommentResponseDTO({
            content: entity.getContent(),
            id: entity.getId()!,
        });
    }
}
