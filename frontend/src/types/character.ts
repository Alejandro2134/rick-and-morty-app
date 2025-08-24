export interface GetCharacters {
  id: number
  image: string
  is_favorite: boolean
  name: string
  species: string
}

export interface CharactersData {
  characters: GetCharacters[]
}

export interface GetCharacter {
  comments: { content: string; id: number }[]
  gender: string
  image: string
  is_favorite: boolean
  name: string
  origin: string
  species: string
  status: string
}

export interface CharacterData {
  character: GetCharacter
}

interface UpdateCharacter {
  is_favorite: boolean
  id: number
}

export interface UpdateCharacterData {
  update: UpdateCharacter
}
