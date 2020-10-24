import React, { Fragment, useCallback, useState, useEffect } from 'react'

export default function MovieNight({ selectedPoll, lang }) {
  const [data, setData] = useState(null)
  // const [movies, setMovies] = useState([])
  const getDb = useCallback(async () => {
    try {
      const response = await fetch(`/api/${lang}/movieNight/${selectedPoll}`)
      const json = await response.json()
      setData(json)
      /*
       * for (const movie of data.movies) {
       * setMovies(movie.id)
       *}
       */
    } catch (e) {
      console.error(e)
    }
  }, [lang, selectedPoll])

  useEffect(() => {
    getDb()
  }, [lang, getDb])

  const log = () => {
    console.log(data)
  }

  return (
    <Fragment>
      {data ? (
        <main className='container'>
          <div className='row'>
            {log()}
            <h1>{data.pollTitle}</h1>
          </div>
          <section className='row'>
            <ul className='list-unstyled'>
              <li>
                {data.pollStarts}-{data.pollEnds}
              </li>
              <li>{data.collaborators.map(el => el.name + ' | ')}</li>
              <li>
                Last edit: {new Date(data.lastEdit).toLocaleDateString('en-US')} by {data.collaborators[data.lastEditedBy].name}
              </li>
            </ul>
          </section>
        </main>
      ) : null}
    </Fragment>
  )
}
