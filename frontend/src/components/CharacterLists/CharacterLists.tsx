import { useQuery } from '@apollo/client/react'

import CharacterList from 'components/CharacterList/CharacterList'
import { GET_CHARACTERS } from 'libs/graphql/queries'
import { useGetCharactersStore } from 'libs/zustand/store/characterStore'
import { useEffect } from 'react'
import { CharactersData } from 'types/character'

const CharacterLists = () => {
  const { loading, error, data } = useQuery<CharactersData>(GET_CHARACTERS, {
    variables: {
      filters: {}
    },
    fetchPolicy: 'no-cache'
  })
  const setCharacters = useGetCharactersStore((state) => state.setCharacters)
  const characters = useGetCharactersStore((state) => state.characters)

  useEffect(() => {
    if (data?.characters) {
      setCharacters(data.characters)
    }
  }, [data, setCharacters])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const starredCharacters = characters.filter(
    (character) => character.is_favorite
  )
  const normalCharacters = characters.filter(
    (character) => !character.is_favorite
  )

  return (
    <div className="flex flex-col gap-[10px] px-[24px]">
      <div className="pt-[42px]">
        <div className="pb-[8px]">
          <h1 className="text-[24px] font-bold leading-[32px]">
            Rick and Morty list
          </h1>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between gap-[8px] rounded-[8px] bg-[#F3F4F6] py-[9px] pl-[13px] pr-[7px]">
        <div className="flex flex-row items-center gap-[8px]">
          <img src="/icons/search.svg" alt="Search" />
          <p className="text-[16px] font-medium leading-[100%] text-[#6B7280]">
            Search or filter results
          </p>
        </div>

        <div className="flex w-[38px] justify-center">
          <img src="/icons/filters.svg" alt="Filters" className="size-[16px]" />
        </div>
      </div>

      <CharacterList
        characters={starredCharacters}
        title={`starred characters ${starredCharacters?.length}`}
      />

      <CharacterList
        characters={normalCharacters}
        title={`characters (${characters?.length})`}
      />
    </div>
  )
}

export default CharacterLists
