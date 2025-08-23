import {
    Character,
    ICharacterFilters,
    ICharacterUpdate,
} from '@domain/entities/Character';
import { ICharacterRepo } from '@domain/repositories/ICharacterRepo';
import {
    Character as CharacterModel,
    ICharacterModel,
} from '@infrastructure/persistency/orm/sequelize/models/Character';
import { Optional } from 'sequelize';
import { Service } from 'typedi';
import { Comment } from '../models/Comment';

type PartialFields = string | undefined | boolean;

@Service()
export class CharacterRepoImpl implements ICharacterRepo {
    async updateById(
        id: number,
        item: ICharacterUpdate,
    ): Promise<Character | null> {
        const updateFields = this.fromPartialDomainToPartialModel(item);
        const [_rowsAffected, updatedCharacters] = await CharacterModel.update(
            updateFields,
            {
                where: {
                    character_id: id,
                },
                returning: true,
            },
        );

        if (updatedCharacters && updatedCharacters.length > 0)
            return this.fromModelToDomain(updatedCharacters[0]);

        return null;
    }

    async getById(id: number): Promise<Character | null> {
        const character = await CharacterModel.findByPk(id, {
            include: [Comment],
        });

        if (character) return this.fromModelToDomain(character);
        return null;
    }

    async buklkCreate(characters: Character[]): Promise<Character[]> {
        const characterModels = characters.map(this.fromDomainToModel);
        const res = await CharacterModel.bulkCreate(characterModels, {
            updateOnDuplicate: ['status', 'image'],
        });

        return res.map(this.fromModelToDomain);
    }

    async getAll(filters: ICharacterFilters): Promise<Character[]> {
        const filterModel = this.fromPartialDomainToPartialModel(filters);
        const characters = await CharacterModel.findAll({
            where: filterModel,
            order: [['character_id', 'ASC']],
        });
        return characters.map(this.fromModelToDomain);
    }

    private fromModelToDomain(model: CharacterModel): Character {
        const character = new Character({
            externalId: model.external_id,
            gender: model.gender,
            image: model.image,
            isFavorite: model.is_favorite,
            name: model.name,
            origin: model.origin,
            species: model.species,
            status: model.status,
            id: model.character_id,
        });

        if (model.comments) {
            model.comments.forEach((comment) => {
                character.setComment({
                    content: comment.content,
                    id: comment.comment_id,
                });
            });
        }

        return character;
    }

    private fromDomainToModel(
        domain: Character,
    ): Optional<ICharacterModel, any> {
        return {
            external_id: domain.getExternalId(),
            gender: domain.getGender(),
            is_favorite: domain.getIsFavorite(),
            name: domain.getName(),
            origin: domain.getOrigin(),
            species: domain.getSpecies(),
            status: domain.getStatus(),
            character_id: domain.getId(),
            image: domain.getImage(),
        };
    }

    private fromPartialDomainToPartialModel(partialDomain: {
        [property: string]: PartialFields;
    }) {
        const partialModel: { [property: string]: PartialFields } = {};

        const lookup: { [property: string]: string } = {
            status: 'status',
            species: 'species',
            gender: 'gender',
            name: 'name',
            origin: 'origin',
            isFavorite: 'is_favorite',
        };

        for (const property in partialDomain) {
            if (partialDomain[property] !== undefined)
                partialModel[lookup[property]] = partialDomain[property];
        }

        return partialModel;
    }
}
