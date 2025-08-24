import { GetCharacters } from 'types/character'
import { create } from 'zustand'

interface GetCharactersState {
  characters: GetCharacters[]
  setCharacters: (characters: GetCharacters[]) => void
  updateCharacter: (character: GetCharacters) => void
}

export const useGetCharactersStore = create<GetCharactersState>((set) => ({
  characters: [],
  setCharacters: (characters) => set({ characters }),
  updateCharacter: (updatedCharacter) =>
    set((state) => ({
      characters: state.characters.map((c) =>
        c.id === updatedCharacter.id ? updatedCharacter : c
      )
    }))
}))
