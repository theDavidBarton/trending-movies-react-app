import React, { Fragment, useCallback, useState, useEffect } from 'react'

export default function MovieNight({ selectedPoll, lang }) {
  const [data, setData] = useState(null)
  const [pollEnded, setPollEnded] = useState(false)

  const getDb = useCallback(async () => {
    try {
      const response = await fetch(`/api/${lang}/movieNight/${selectedPoll}`)
      const json = await response.json()
      setData(json)
    } catch (e) {
      console.error(e)
    }
  }, [lang, selectedPoll])

  const optionsTemp = {
    _id: Date.now(),
    hello: 'world',
    good: 'bye'
  }

  const createPollPost = async () => {
    try {
      await fetch(`/api/${lang}/movieNightAddNew`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(optionsTemp)
      })
    } catch (e) {
      console.error(e)
    }
  }

  const updatePollPost = async options => {
    try {
      await fetch(`/api/${lang}/movieNightUpdate/${selectedPoll}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(options)
      })
    } catch (e) {
      console.error(e)
    }
  }

  const isPollEnded = () => {
    const msg = <Fragment>{Date.parse(data.pollEnds) > Date.now() ? <span>(This poll has been ended!)</span> : null}</Fragment>
    if (Date.parse(data.pollEnds) > Date.now()) setPollEnded(true)
    return msg
  }

  const log = () => {
    console.log(data)
  }

  const createPoll = () => {
    window.location.href + '?poll=' + Date.now()
  }

  // force update hooks, https://stackoverflow.com/questions/53215285/how-can-i-force-component-to-re-render-with-hooks-in-react
  const [, setUnusedState] = useState()
  const forceUpdate = useCallback(() => setUnusedState({}), [])

  const addVote = i => {
    const tempData = data
    tempData.movies[i].pollVotes++
    setData(tempData)
    updatePollPost(data)
    forceUpdate()
    log()
  }

  const cards = () => {
    const cards = data.movies
      .sort((a, b) => b.pollVotes - a.pollVotes)
      .map((movie, index) => (
        <Fragment key={movie.id}>
          <div className='col-auto d-lg-inline-flex d-block pb-2'>
            <div className='col-auto'>
              <span className='position-absolute poll-votes'>
                {movie.pollVotes} <span className='smaller'>{movie.pollVotes === 1 ? 'vote' : 'votes'}</span>
              </span>
              <img className='img-fluid mx-auto d-block' src={'https://image.tmdb.org/t/p/w185' + movie.poster_path} />
              {!pollEnded ? (
                <span className='vote-button' onClick={() => addVote(index)}>
                  👍
                </span>
              ) : null}
            </div>
            <div className='p-4 col-12 col-lg-6'>
              <h3>
                {`${index + 1}. ${movie.title}`} <span className='smaller'>{movie.release_date.match(/[0-9]{4}/)}</span>
              </h3>
              <p>{movie.overview}</p>
              <a href={`/${lang}/movie/${movie.id + window.location.search}`}>
                <i>{movie.title}</i> movie page
              </a>
            </div>
          </div>
        </Fragment>
      ))
    return cards
  }

  useEffect(() => {
    getDb()
  }, [lang, getDb])

  return (
    <main className='container'>
      {data ? (
        <Fragment>
          <div className='row'>
            {log()}
            {false ? createPoll() : null}
            <h1 className='col'>
              {data.pollTitle}{' '}
              <span className='smaller'>
                ({data.movies.length} {data.movies.length === 1 ? 'movie' : 'movies'})
              </span>
            </h1>
          </div>
          <section className='row'>
            <ul className='list-unstyled col'>
              <li>
                <strong>Poll starts:</strong> {data.pollStarts}, <strong>poll ends:</strong> {data.pollEnds} {isPollEnded()}
              </li>
              <li>
                <strong>Collaborators:</strong> {data.collaborators.map((el, i) => (i ? ', ' : '') + el.name)}
              </li>
              <li>
                <strong>Last edit:</strong> {new Date(data.lastEdit).toLocaleDateString('en-US')} by{' '}
                {data.collaborators[data.lastEditedBy].name}
              </li>
            </ul>
          </section>
          <section className='row'>
            <h2 className='col'>Your picks</h2>
            {data.movies.length > 0 ? cards() : <h3 className='col'>No movies added yet...</h3>}
          </section>
          <button onClick={createPollPost}>POST</button>
        </Fragment>
      ) : null}
    </main>
  )
}
