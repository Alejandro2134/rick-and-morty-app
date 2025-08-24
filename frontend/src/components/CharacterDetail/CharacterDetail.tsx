import { useMutation, useQuery } from '@apollo/client/react'
import CharacterAttribute from 'components/CharacterAttribute/CharacterAttribute'
import Heart from 'components/Icons/Heart'
import { CREATE_COMMENT } from 'libs/graphql/mutations'
import { GET_CHARACTER } from 'libs/graphql/queries'
import { FormEvent, useState } from 'react'
import { Link, useParams } from 'react-router'
import { CharacterData } from 'types/character'
import { CreateCommentData } from 'types/comment'

const CharacterDetail = () => {
  const { id } = useParams()
  const { loading, error, data, refetch } = useQuery<CharacterData>(
    GET_CHARACTER,
    {
      variables: {
        characterId: +id!
      },
      fetchPolicy: 'no-cache'
    }
  )
  const [createComment, { loading: createCommentLoading }] =
    useMutation<CreateCommentData>(CREATE_COMMENT, {
      fetchPolicy: 'no-cache',
      onCompleted: async () => {
        await refetch()
      }
    })
  const [text, setText] = useState('')

  const handleCreateComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    createComment({
      variables: {
        data: {
          character_id: +id!,
          content: text
        }
      }
    })
  }

  if (loading || createCommentLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="px-[24px]">
      <div className="pb-[16px]">
        <div className="py-[16px]">
          <div className="">
            <Link to="/">
              <img src="/icons/backarrow.svg" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-[8px]">
          <div className="relative size-[75px]">
            <img
              src={data?.character.image}
              className="size-[75px] rounded-full"
            />

            <div className="absolute -bottom-0 -right-0 flex size-[24px] items-center justify-center rounded-full bg-white ">
              {data?.character.is_favorite ? (
                <Heart className="h-[15.36px] w-[18px] fill-[#53C629] stroke-[#53C629]" />
              ) : (
                <Heart className="fill-white stroke-[#D1D5DB]" />
              )}
            </div>
          </div>

          <h1 className="text-[24px] font-bold leading-[32px] text-[#111827]">
            {data?.character.name}
          </h1>
        </div>
      </div>

      <div className="divide-y pb-[16px]">
        <CharacterAttribute
          attribute="Specie"
          value={data?.character.species ?? ''}
        />
        <CharacterAttribute
          attribute="Gender"
          value={data?.character.gender ?? ''}
        />
        <CharacterAttribute
          attribute="Origin"
          value={data?.character.origin ?? ''}
        />
        <CharacterAttribute
          attribute="Specie"
          value={data?.character.species ?? ''}
        />
        <CharacterAttribute
          attribute="Status"
          value={data?.character.status ?? ''}
        />
      </div>

      <div>
        <form className="flex flex-col gap-2" onSubmit={handleCreateComment}>
          <textarea
            className="resize-none rounded border border-[#8054C7] p-2 focus:outline-none"
            rows={3}
            placeholder="Add a comment for this character!"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="self-end rounded bg-[#8054C7] px-4 py-1 text-white"
            type="submit"
          >
            Comment
          </button>
        </form>

        <div className="mt-4 divide-y">
          {data?.character.comments.map((comment) => (
            <div key={comment.id} className="py-2">
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CharacterDetail
