import React from 'react'
import { Link } from 'react-router-dom'

export const LinkItem = ({ title, to, children }) => {
  return (
    <div className='grid grid-cols-2'>
      <h2 className='py-5 text-4xl font-bold text-center  border-r-2 border-zinc-400 dark:border-zinc-300 text-gray-900 dark:text-gray-100'>
        {title}
      </h2>
      {children}
    </div>
  )
}
