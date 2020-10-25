import React, { Fragment, useCallback, useState, useEffect } from 'react'

export default function MovieNight({ selectedPoll, lang }) {
  const [data, setData] = useState(null)
  const [movieData, setMovieData] = useState(null)

  const getDb = useCallback(async () => {
    try {
      const response = await fetch(`/api/${lang}/movieNight/${selectedPoll}`)
      const json = await response.json()
      setData(json)
      setMovieData(json.movies)
    } catch (e) {
      console.error(e)
    }
  }, [lang, selectedPoll])

  useEffect(() => {
    getDb()
  }, [lang, getDb])

  const log = () => {
    console.log('data', data)
    console.log('movies', movieData)
  }

  const createPoll = () => {
    window.location.href + '?poll=' + Date.now()
  }

  const cards = () => {
    const cards = data.movies
      .sort((a, b) => b.pollVotes - a.pollVotes)
      .map(movie => (
        <Fragment key={movie.id}>
          <div className='col-lg-4 col-auto pb-2'>
            <span className='position-absolute poll-votes'>
              {movie.pollVotes} <span className='smaller'>{movie.pollVotes === 1 ? 'vote' : 'votes'}</span>
            </span>
            <img src={'https://image.tmdb.org/t/p/w342' + movie.poster_path} />
            <h2>
              {movie.title} <span className='smaller'>{movie.release_date.match(/[0-9]{4}/)}</span>
            </h2>
            <p>{movie.overview}</p>
          </div>
        </Fragment>
      ))
    return cards
  }

  return (
    <Fragment>
      {data ? (
        <main className='container'>
          <div className='row'>
            {log()}
            {false ? createPoll() : null}
            <h1 className='col'>{data.pollTitle}</h1>
          </div>
          <section className='row'>
            <ul className='list-unstyled col'>
              <li>
                {data.pollStarts}-{data.pollEnds}
              </li>
              <li>{data.collaborators.map(el => el.name + ', ')}</li>
              <li>
                Last edit: {new Date(data.lastEdit).toLocaleDateString('en-US')} by {data.collaborators[data.lastEditedBy].name}
              </li>
            </ul>
          </section>
          <section className='row'>{cards()}</section>
        </main>
      ) : null}
    </Fragment>
  )
}
