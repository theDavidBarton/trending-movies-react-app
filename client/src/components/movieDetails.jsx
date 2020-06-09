import React, { useState, useEffect, Fragment, useCallback } from 'react'
import i18n from './../i18n.json'

export default function MovieDetails({ selectedMovie, lang }) {
  const [data, setData] = useState(null)
  const [dataIsReady, setDataIsReady] = useState(false)
  const [id] = useState(selectedMovie)
  const [displayedCastMembers, setDisplayedCastMembers] = useState(5)
  const [fullCastIsOpened, setFullCastIsOpened] = useState(false)
  const [labels] = useState(i18n.details)

  const getTmdbApi = useCallback(async () => {
    try {
      const response = await fetch(`/api/${lang}/movieDetails/${id}`)
      const json = await response.json()
      // issue: #83; docs: https://www.themoviedb.org/documentation/api/status-codes
      if (json.status_code > 1) throw new Error('The resource you requested could not be found.')
      setData(json)
      setDataIsReady(true)
    } catch (e) {
      console.error(e)
    }
  }, [lang, id])

  useEffect(() => {
    getTmdbApi()
  }, [lang, getTmdbApi])

  // component candidates:
  const getTitle = () => {
    const title = data.title
    return title
  }

  const getReleaseYear = () => {
    const releaseYear = data.release_date.match(/[0-9]{4}/)
    return releaseYear
  }

  const getReleaseDate = () => {
    const releaseDate = data.release_date
    return releaseDate
  }

  const getTagline = () => {
    const tagline = data.tagline
    return tagline
  }

  const getOverview = () => {
    const overView = data.overview
    return overView
  }

  const getRuntime = () => {
    const runtime = data.runtime
    return runtime
  }

  const getVotes = () => {
    const votes = data.vote_average
    return votes
  }

  const getGenres = () => {
    const genresArray = data.genres
    const genres = genresArray.map((genreElement, index) => (
      <span key={index + 1}>{(index ? ', ' : '') + genreElement.name}</span>
    ))
    return genres
  }

  const getCompanies = () => {
    const companiesArray = data.production_companies
    const companies = companiesArray.map((companyElement, index) => (
      <span key={index + 1}>{(index ? ', ' : '') + companyElement.name}</span>
    ))
    return companies
  }

  const getCompanyLogos = () => {
    const companiesArray = data.production_companies
    const companyLogos = companiesArray.map(companyElement => (
      <Fragment key={companyElement.id}>
        {companyElement.logo_path ? (
          <img
            className='company-logo-margin'
            src={'https://image.tmdb.org/t/p/w45' + companyElement.logo_path}
            alt='company logo'
          />
        ) : null}
      </Fragment>
    ))
    return companyLogos
  }

  const getBackground = () => {
    const background = data.backdrop_path
    return background
  }

  const getPoster = () => {
    const poster = 'https://image.tmdb.org/t/p/w342' + data.poster_path
    return poster
  }

  const getCrew = () => {
    const castImageBase = 'https://image.tmdb.org/t/p/w90_and_h90_face'
    // cast display priority: Director, Writer, Novel, Screenplay
    const directorArray = data.credits.crew.filter(crewMember => crewMember.job === 'Director')
    const writerArray = data.credits.crew.filter(crewMember => crewMember.job === 'Writer')
    const novelWriterArray = data.credits.crew.filter(crewMember => crewMember.job === 'Novel')
    const screenWriterArray = data.credits.crew.filter(crewMember => crewMember.job === 'Screenplay')
    const importantCrewArray = [...directorArray, ...writerArray, ...novelWriterArray, ...screenWriterArray]

    const importantCrewArrayReduced = importantCrewArray.reduce((acc, currentCastMember) => {
      let found = acc.find(el => el.name === currentCastMember.name)
      found ? (found.job = found.job + ' & ' + currentCastMember.job) : acc.push(currentCastMember)
      return acc
    }, [])

    const importantCrewMembers = importantCrewArrayReduced.map(crewMember => (
      <Fragment key={crewMember.id + crewMember.job}>
        <li className='col media my-3'>
          {crewMember.profile_path ? (
            <img alt={crewMember.name} src={castImageBase + crewMember.profile_path} className='mr-3 rounded-circle' />
          ) : (
            <div className='mr-3'>
              <svg width='90' height='90'>
                <circle cx='45' cy='45' r='45' fill='#D5D8DC' />
                Sorry, your browser does not support inline SVG.
              </svg>{' '}
            </div>
          )}
          <div className='media-body'>
            <h5 className='mt-0 mb-1'>{crewMember.name}</h5>
            {crewMember.job}
          </div>
        </li>
      </Fragment>
    ))
    return importantCrewMembers
  }

  const getCast = () => {
    const castImageBase = 'https://image.tmdb.org/t/p/w90_and_h90_face'
    const castArray = data.credits.cast
    const cast = castArray.slice(0, displayedCastMembers).map(castMember => (
      <Fragment key={castMember.id + castMember.character}>
        <li className='media my-3'>
          {castMember.profile_path ? (
            <img alt={castMember.name} src={castImageBase + castMember.profile_path} className='mr-3 rounded-circle' />
          ) : (
            <div className='mr-3'>
              <svg width='90' height='90'>
                <circle cx='45' cy='45' r='45' fill='#D5D8DC' />
                Sorry, your browser does not support inline SVG.
              </svg>{' '}
            </div>
          )}
          <div className='media-body'>
            <h5 className='mt-0 mb-1'>{castMember.name}</h5>
            {labels.as[lang]} {castMember.character}
          </div>
        </li>
      </Fragment>
    ))
    return cast
  }

  const setDisplayedCastFn = () => {
    setDisplayedCastMembers(displayedCastMembers.length)
    setFullCastIsOpened(true)
  }

  const setBackDisplayedCastFn = () => {
    setDisplayedCastMembers(5)
    setFullCastIsOpened(false)
  }

  const bgImage = dataIsReady
    ? 'linear-gradient(rgba(52,58,64,.6), rgba(52,58,64,.6)), url(https://image.tmdb.org/t/p/w1280' + getBackground() + ')'
    : 'url(data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==)'

  return (
    <Fragment>
      {dataIsReady ? (
        <div className='container'>
          <header border-bottom='1px' solid='#000'>
            <h2 className='display-4 mt-2 heading-line' id='movieDetailsLabel' display='inline'>
              {getTitle()}
              <span className='lead heading-line'> ({getReleaseYear()}) </span>
            </h2>
          </header>
          {getTagline() === '' ? (
            <blockquote className='lead'> </blockquote>
          ) : (
            <blockquote className='blockquote-footer lead'>{getTagline()}</blockquote>
          )}
          <div className='row text-white greyscale-img-background' style={{ backgroundImage: bgImage }}>
            <div className='col-md-3 my-3'>
              <img src={getPoster()} alt='poster' className='poster-width' />
            </div>
            <div className='col m-4'>
              <div>
                <h4>{labels.overview[lang]}</h4>
                <p className='mb-2'>{getOverview()}</p>
              </div>
              <h4>{labels.creators[lang]}</h4>
              <div className='row'>
                <ul className='row list-unstyled list-group list-group-horizontal'>{getCrew()}</ul>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-3 my-3'>
              <h4>{labels.facts[lang]}</h4>
              {getCompanyLogos()}
              <br />
              <strong>{labels.company[lang]}</strong> {getCompanies()}
              <br />
              <strong>{labels.duration[lang]}</strong> {getRuntime()} {labels.mins[lang]}
              <br />
              <strong>{labels.genre[lang]}</strong> {getGenres()}
              <br />
              <strong>{labels.release[lang]}</strong> {getReleaseDate()}
              <br />
              <strong>{labels.voted[lang]}</strong> ★{getVotes()}/10
              <br />
            </div>
            <div className='col my-3'>
              <h4>{labels.cast[lang]}</h4>
              <ul className='list-unstyled'>{getCast()}</ul>
              {!fullCastIsOpened ? (
                <button className='btn btn-dark' onClick={setDisplayedCastFn}>
                  {labels.showCast[lang]}
                </button>
              ) : (
                <button className='btn btn-dark' onClick={setBackDisplayedCastFn}>
                  {labels.hideCast[lang]}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  )
}
