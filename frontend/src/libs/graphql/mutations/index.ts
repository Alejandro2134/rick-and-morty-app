import { gql } from '@apollo/client'

export const UPDATE_CHARACTER = gql`
  mutation UpdateCharacter($updates: CharacterUpdates!, $updateId: Int!) {
    update(updates: $updates, id: $updateId) {
      is_favorite
      id
    }
  }
`

export const CREATE_COMMENT = gql`
  mutation CreateComment($data: CommentCreate!) {
    create(data: $data) {
      content
      id
    }
  }
`
