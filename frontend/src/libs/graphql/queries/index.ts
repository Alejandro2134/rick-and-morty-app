import { gql } from '@apollo/client'

export const GET_CHARACTERS = gql`
  query GetCharacters($filters: CharacterFilters!) {
    characters(filters: $filters) {
      id
      image
      is_favorite
      name
      species
    }
  }
`

export const GET_CHARACTER = gql`
  query GetCharacter($characterId: Int!) {
    character(id: $characterId) {
      comments {
        content
        id
      }
      gender
      image
      is_favorite
      name
      origin
      species
      status
    }
  }
`
