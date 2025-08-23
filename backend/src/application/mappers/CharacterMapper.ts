import { CharacterResponseDTO } from '@application/dto/CharacterDTO';
import { Character } from '@domain/entities/Character';

export class CharacterMapper {
    fromDomainToDTO(domain: Character): CharacterResponseDTO {
        const characterResponseDTO = new CharacterResponseDTO({
            gender: domain.getGender(),
            id: domain.getId()!,
            image: domain.getImage(),
            is_favorite: domain.getIsFavorite(),
            name: domain.getName(),
            origin: domain.getOrigin(),
            species: domain.getSpecies(),
            status: domain.getStatus(),
        });

        domain.getComments().forEach((comment) => {
            characterResponseDTO.setComment({
                content: comment.content,
                id: comment.id!,
            });
        });

        return characterResponseDTO;
    }

    fromPartialDTOToPartialDomain(partialDto: {
        [property: string]: undefined | boolean;
    }) {
        const partialDomain: { [property: string]: undefined | boolean } = {};

        const lookup: { [property: string]: string } = {
            is_favorite: 'isFavorite',
        };

        for (const property in partialDto) {
            if (partialDto[property] !== undefined)
                partialDomain[lookup[property]] = partialDto[property];
        }

        return partialDomain;
    }
}
