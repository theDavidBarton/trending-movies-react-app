import React, { Component, Fragment } from 'react'

class MovieDetails extends Component {
  state = {
    data: null,
    dataIsReady: false,
    id: this.props.selectedMovie,
    displayedCastMembers: 5,
    fullCastIsOpened: false
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

  getReleaseDate = () => {
    const releaseDate = this.state.data.release_date
    return releaseDate
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

  getVotes = () => {
    const votes = this.state.data.vote_average
    return votes
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

  getCrew = () => {
    const castImageBase = 'https://image.tmdb.org/t/p/w90_and_h90_face'
    // cast display priority: Director, Writer, Novel, Screenplay
    const directorArray = this.state.data.credits.crew.filter(crewMember => crewMember.job === 'Director')
    const writerArray = this.state.data.credits.crew.filter(crewMember => crewMember.job === 'Writer')
    const novelWriterArray = this.state.data.credits.crew.filter(crewMember => crewMember.job === 'Novel')
    const screenWriterArray = this.state.data.credits.crew.filter(crewMember => crewMember.job === 'Screenplay')
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

  getCast = () => {
    const castImageBase = 'https://image.tmdb.org/t/p/w90_and_h90_face'
    const castArray = this.state.data.credits.cast
    const cast = castArray.slice(0, this.state.displayedCastMembers).map(castMember => (
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
            as {castMember.character}
          </div>
        </li>
      </Fragment>
    ))
    return cast
  }

  setDisplayedCast = () => {
    this.setState({ displayedCastMembers: this.state.displayedCastMembers.length, fullCastIsOpened: true })
  }

  setBackDisplayedCast = () => {
    this.setState({ displayedCastMembers: 5, fullCastIsOpened: false })
  }

  render() {
    let bgImage = this.state.dataIsReady
      ? 'linear-gradient(rgba(52,58,64,.6), rgba(52,58,64,.6)), url(https://image.tmdb.org/t/p/w1280' +
        this.getBackground() +
        ')'
      : 'url(data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==)'
    return (
      <Fragment>
        {this.state.dataIsReady ? (
          <div className='container'>
            <header border-bottom='1px' solid='#000'>
              <h2 className='display-4 mt-2 heading-line' id='movieDetailsLabel' display='inline'>
                {this.getTitle()}
                <span className='lead heading-line'> ({this.getReleaseYear()}) </span>
              </h2>
            </header>
            <blockquote className='blockquote-footer lead'>{this.getTagline()}</blockquote>
            <div className='row text-white greyscale-img' style={{ backgroundImage: bgImage }}>
              <div className='col-md-3 my-3'>
                <img src={this.getPoster()} alt='poster' className='poster-width greyscale-img' />
              </div>
              <div className='col m-4'>
                <div>
                  <h4>Overview:</h4>
                  <p className='mb-2'>{this.getOverview()}</p>
                </div>
                <h4>Creators:</h4>
                <div className='row'>
                  <ul className='row list-unstyled list-group list-group-horizontal'>{this.getCrew()}</ul>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-3 my-3'>
                <h4>Facts:</h4>
                {this.getCompanyLogos()}
                <br />
                <strong>Company:</strong> {this.getCompanies()}
                <br />
                <strong>Duration:</strong> {this.getRuntime()} mins
                <br />
                <strong>Genre:</strong> {this.getGenres()}
                <br />
                <strong>Release:</strong> {this.getReleaseDate()}
                <br />
                <strong>Voted:</strong> ★{this.getVotes()}/10
                <br />
              </div>
              <div className='col my-3'>
                <h4>Cast:</h4>
                <ul className='list-unstyled'>{this.getCast()}</ul>
                {!this.state.fullCastIsOpened ? (
                  <button className='btn btn-dark' onClick={this.setDisplayedCast}>
                    Show full cast
                  </button>
                ) : (
                  <button className='btn btn-dark' onClick={this.setBackDisplayedCast}>
                    Hide full cast
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </Fragment>
    )
  }
}
export default MovieDetails
