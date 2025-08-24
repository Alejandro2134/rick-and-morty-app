import CharacterCard from 'components/CharacterCard/CharacterCard'
import { GetCharacters } from '../../types/character'
import { useState } from 'react'

type CharacterListProps = {
  title: string
  characters: GetCharacters[]
}

const CharacterList: React.FC<CharacterListProps> = ({ title, characters }) => {
  const [isSorted, setIsSorted] = useState(true)

  const handleSort = () => {
    setIsSorted(!isSorted)
  }

  const sortedCharacters = isSorted
    ? characters.sort((a, b) => a.name.localeCompare(b.name))
    : characters.sort((a, b) => b.name.localeCompare(a.name))

  return (
    <div>
      <div className="flex justify-between py-[16px]">
        <h2 className="text-[12px] font-semibold uppercase leading-[16px] text-[#6B7280]">
          {title}
        </h2>
        <p
          className="cursor-pointer text-[12px] text-[#6B7280]"
          onClick={() => handleSort()}
        >
          {isSorted ? 'A/Z' : 'Z/A'}
        </p>
      </div>

      <div className="divide-y">
        {sortedCharacters.map((character) => (
          <CharacterCard key={character.id} characterInfo={character} />
        ))}
      </div>
    </div>
  )
}

export default CharacterList
