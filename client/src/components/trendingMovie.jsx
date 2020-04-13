import React from 'react'

export default function TrendingMovie(props) {
  const getPoster = () => {
    const poster = 'https://image.tmdb.org/t/p/w342' + props.data.results[props.value].poster_path
    return poster
  }

  const getTitle = () => {
    const title = props.data.results[props.value].title
    return title
  }

  const getOverview = () => {
    const overview = props.data.results[props.value].overview
    return overview
  }

  const getRating = () => {
    const rating = props.data.results[props.value].vote_average
    return rating
  }

  const getRank = () => {
    const rank = props.value + 1
    return rank
  }

  const selectedMovie = () => {
    const movie = `/${props.lang}/movie/${props.data.results[props.value].id}`
    return movie
  }

  return (
    <div className='col-md-4'>
      <a href={selectedMovie()} className='text-decoration-none'>
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
