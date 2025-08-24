import { useMutation } from '@apollo/client/react'
import Heart from 'components/Icons/Heart'
import { UPDATE_CHARACTER } from 'libs/graphql/mutations'
import { useGetCharactersStore } from 'libs/zustand/store/characterStore'
import { Link } from 'react-router'
import { GetCharacters, UpdateCharacterData } from 'types/character'

type CharacterCardProps = {
  characterInfo: GetCharacters
}

const CharacterCard: React.FC<CharacterCardProps> = ({ characterInfo }) => {
  const updateCharacterInStore = useGetCharactersStore(
    (state) => state.updateCharacter
  )
  const [updateCharacter, { loading }] = useMutation<UpdateCharacterData>(
    UPDATE_CHARACTER,
    {
      fetchPolicy: 'no-cache',
      onCompleted: (data) => {
        updateCharacterInStore({
          id: characterInfo.id,
          image: characterInfo.image,
          is_favorite: data.update.is_favorite,
          name: characterInfo.name,
          species: characterInfo.species
        })
      }
    }
  )

  const handleCharacterStarred = (isStarred: boolean, id: number) => {
    updateCharacter({
      variables: {
        updates: {
          is_favorite: isStarred
        },
        updateId: +id
      }
    })
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="flex items-center justify-between py-[16px]">
      <Link to={`/character/${characterInfo.id}`}>
        <div className="flex items-center gap-[16px]">
          <img
            src={characterInfo.image}
            className="size-[32px] rounded-[20px]"
          />
          <div>
            <p className="text-[16px] font-semibold leading-[100%] text-[#111827]">
              {characterInfo.name}
            </p>
            <p className="text-[16px] font-normal leading-[100%] text-[#6B7280]">
              {characterInfo.species}
            </p>
          </div>
        </div>
      </Link>

      <div className="flex w-[32px] justify-center">
        {characterInfo.is_favorite ? (
          <Heart
            onClick={() => handleCharacterStarred(false, characterInfo.id)}
            className="cursor-pointer fill-[#53C629] stroke-[#53C629]"
          />
        ) : (
          <Heart
            onClick={() => handleCharacterStarred(true, characterInfo.id)}
            className="cursor-pointer fill-white stroke-[#D1D5DB]"
          />
        )}
      </div>
    </div>
  )
}

export default CharacterCard
