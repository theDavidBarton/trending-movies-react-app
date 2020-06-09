import React from 'react'

export default function TrendingMovie({ lang, value, data }) {
  const getPoster = () => {
    const poster = 'https://image.tmdb.org/t/p/w342' + data.results[value].poster_path
    return poster
  }

  const getTitle = () => {
    const title = data.results[value].title
    return title
  }

  const getOverview = () => {
    const overview = data.results[value].overview
    return overview
  }

  const getRating = () => {
    const rating = data.results[value].vote_average
    return rating
  }

  const getRank = () => {
    const rank = value + 1
    return rank
  }

  return (
    <div className='col-md-4'>
      <a href={`/${lang}/movie/${data.results[value].id}`} className='text-decoration-none'>
        <div className='card bg-dark text-white border-0'>
          <div>
            <div className='img-zoom-container'>
              <div className='img-zoom'>
                <img className='card-img-top' alt='movie poster' src={getPoster()} />
              </div>
            </div>
            <div className='badge-pill badge-warning position-absolute mt-4 right-badge'>★{getRating()}/10</div>
          </div>
          <div className='card-body'>
            <div className='badge-pill badge-danger display-4 position-absolute badge-position'>
              #<strong>{getRank()}</strong>
            </div>
            <h2>{getTitle()}</h2>
            <p>{getOverview()}</p>
          </div>
        </div>
      </a>
    </div>
  )
}
