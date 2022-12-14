import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Card = ({ data }) => {
  const navigate = useNavigate()

  return (
    <article
      onClick={() => navigate(`/single-character/${data.id}`)}
      className='m-5 max-w-xs rounded-xl bg-zinc-100 shadow-md cursor-pointer dark:bg-zinc-700'
    >
      <img className={`w-full`} src={data.image} alt='character' />
      <p className='my-5 text-center text-4xl font-semibold dark:text-gray-100'>
        {data.name}
      </p>
    </article>
  )
}
