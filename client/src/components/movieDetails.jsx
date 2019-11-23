import React, { Component, Fragment } from 'react'

class MovieDetails extends Component {
  state = {
    data: null,
    dataIsReady: false,
    id: this.props.selectedMovie,
    isOpened: true,
    displayedCastMembers: 5
  }

  componentDidMount() {
    this.getTmdbApi()
  }

  getTmdbApi = async () => {
    try {
      const response = await fetch(`/api/movieDetails/${this.state.id}`)
      const json = await response.json()
      this.setState({ data: json, dataIsReady: true })
    } catch (e) {
      console.error(e)
    }
  }

  getTitle = () => {
    const title = this.state.data.title
    console.log(this.state.data)
    return title
  }

  getReleaseYear = () => {
    const releaseYear = this.state.data.release_date.match(/[0-9]{4}/)
    return releaseYear
  }

  getTagline = () => {
    const tagline = this.state.data.tagline
    return tagline
  }

  getOverview = () => {
    const overView = this.state.data.overview
    return overView
  }

  getRuntime = () => {
    const runtime = this.state.data.runtime
    return runtime
  }

  getGenres = () => {
    const genresArray = this.state.data.genres
    const genres = genresArray.map((genreElement, index) => (
      <span key={index + 1}>{(index ? ', ' : '') + genreElement.name}</span>
    ))
    return genres
  }

  getCompanies = () => {
    const companiesArray = this.state.data.production_companies
    const companies = companiesArray.map((companyElement, index) => (
      <span key={index + 1}>{(index ? ', ' : '') + companyElement.name}</span>
    ))
    return companies
  }

  getCompanyLogos = () => {
    const companiesArray = this.state.data.production_companies
    const companyLogos = companiesArray.map(companyElement => (
      <Fragment key={companyElement.id}>
        {companyElement.logo_path ? (
          <img src={'https://image.tmdb.org/t/p/w45' + companyElement.logo_path} alt='company logo' />
        ) : null}
      </Fragment>
    ))
    return companyLogos
  }

  getBackground = () => {
    const background = this.state.data.backdrop_path
    return background
  }

  getPoster = () => {
    const poster = 'https://image.tmdb.org/t/p/w185' + this.state.data.poster_path
    return poster
  }

  getCast = () => {
    const castImageBase = 'https://image.tmdb.org/t/p/w90_and_h90_face'
    const castArray = this.state.data.credits.cast
    const cast = castArray.slice(0, this.state.displayedCastMembers).map(castMember => (
      <Fragment key={castMember.id}>
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
            as {castMember.character}
          </div>
        </li>
      </Fragment>
    ))
    return cast
  }

  setDisplayedCast = () => {
    this.setState({ displayedCastMembers: 15 }) // _TODO: check the length of the array of cast members!
  }

  render() {
    let bgImage = this.state.dataIsReady
      ? 'url(https://image.tmdb.org/t/p/w1280' + this.getBackground() + ')'
      : 'url(data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==)'
    return (
      <Fragment>
        {this.state.isOpened ? (
          <div className='row'>
            {this.state.dataIsReady ? (
              <div className='col'>
                <div>
                  <div className='container'>
                    <header border-bottom='1px' solid='#000'>
                      <h2 className='display-4' id='movieDetailsLabel' display='inline'>
                        {this.getTitle()}
                        <span className='lead'> ({this.getReleaseYear()}) </span>
                      </h2>
                    </header>
                    <blockquote className='blockquote-footer lead'>{this.getTagline()}</blockquote>
                    <div
                      className='row text-white'
                      style={{
                        backgroundImage: bgImage,
                        backgroundRepeat: 'no-repeat',
                        filter: 'grayscale(100%)'
                      }}>
                      <div>
                        <img src={this.getPoster()} alt='poster' className='img-fluid' height='200px' />
                      </div>
                      <div className='col my-1'>
                        <h4>Overview:</h4>
                        {this.getOverview()}
                        <br />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-3 my-3'>
                        {this.getCompanyLogos()}
                        <br />
                        <strong>Company:</strong> {this.getCompanies()}
                        <br />
                        <strong>Duration:</strong> {this.getRuntime()} mins
                        <br />
                        <strong>Genre:</strong> {this.getGenres()}
                        <br />
                      </div>
                      <div className='col my-3'>
                        <h4>Cast:</h4>
                        <ul className='list-unstyled'>{this.getCast()}</ul>
                        <button onClick={this.setDisplayedCast}>Show full cast</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </Fragment>
    )
  }
}
export default MovieDetails
