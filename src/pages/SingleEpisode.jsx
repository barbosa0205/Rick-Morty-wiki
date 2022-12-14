import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { Label } from '../components/Label'
import { Loading } from '../components/Loading'
import RainbowTV from '../assets/rainbowTvScreen.png'
import { Card } from '../components/Card'
import { useTranslation } from 'react-i18next'
export const SingleEpisode = () => {
  const { t } = useTranslation()
  const { id } = useParams()

  const [characters, setCharacters] = useState([])
  const {
    data: episode,
    startFetching,
    loading,
  } = useFetch(`https://rickandmortyapi.com/api/episode/${id}`)

  const fetchCharacters = async (urls) => {
    const results = await Promise.all(
      urls.map((url) => fetch(url).then((r) => r.json()))
    )
    return results
  }

  useEffect(() => {
    startFetching()
  }, [])

  useEffect(() => {
    if (episode) {
      ;(async () => {
        const charactersData = await fetchCharacters(episode.characters)

        setCharacters(charactersData)
      })()
    }
  }, [episode])

  return (
    <>
      {episode ? (
        <>
          <header className='flex flex-col items-center'>
            <img
              className='max-w-xl mx-auto mt-20'
              src={RainbowTV}
              alt='rainbow TV'
            />
            <h1 className='text-center text-7xl font-bold my-10 text-zinc-800 dark:text-gray-100'>
              {episode.name}
            </h1>
            <p className='text-4xl font-semibold mb-12 dark:text-gray-100'>
              {t('Seasson.text')}{' '}
              {episode.episode.slice(
                episode.episode.lastIndexOf('S') + 1,
                episode.episode.lastIndexOf('E')
              )}{' '}
              {t('Episode.text')}{' '}
              {episode.episode.slice(episode.episode.lastIndexOf('E') + 1)}
            </p>
            <section className='flex flex-wrap items-center justify-evenly p-5 shadow-sm bg-zinc-200  dark:bg-zinc-800 rounded-xl'>
              <Label
                text={episode.air_date}
                icon='ri-calendar-event-line'
                title={'Type'}
              />
            </section>
          </header>

          <section>
            <h1 className='text-center text-5xl font-bold mt-20 dark:text-zinc-100'>
              {t('AllCharactersInEpisode.text')}
            </h1>
            <div className='flex flex-wrap justify-center my-5'>
              {characters
                ? characters.map((character) => (
                    <Card key={character.id} data={character} />
                  ))
                : ''}
            </div>
          </section>
        </>
      ) : (
        <section className='h-screen w-full flex items-center justify-center'>
          <Loading />
        </section>
      )}
    </>
  )
}
