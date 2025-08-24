type CharacterAttributeProps = {
  attribute: string
  value: string
}

const CharacterAttribute: React.FC<CharacterAttributeProps> = ({
  attribute,
  value
}) => {
  return (
    <div className="py-[16px]">
      <p className="text-[16px] font-semibold leading-[100%] text-[#111827]">
        {attribute}
      </p>
      <p className="text-[16px] font-medium leading-[100%] text-[#6B7280]">
        {value}
      </p>
    </div>
  )
}

export default CharacterAttribute
