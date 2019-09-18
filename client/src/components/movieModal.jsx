import React, { Component, Fragment } from 'react'

class MovieModal extends Component {
  state = {
    data: null,
    dataIsReady: false,
    id: 454,
    isOpened: true
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

  getBackground = () => {
    const background = this.state.data.backdrop_path
    return background
  }

  getPoster = () => {
    const poster =
      'https://image.tmdb.org/t/p/w185' + this.state.data.poster_path
    return poster
  }

  getCast = () => {
    const castImageBase = 'https://image.tmdb.org/t/p/w90_and_h90_face'
    const castArray = this.state.data.credits.cast
    const cast = castArray.map(castMember => (
      <Fragment key={castMember.id}>
        <li className='media my-3'>
          {castMember.profile_path ? (
            <img
              alt={castMember.name}
              src={castImageBase + castMember.profile_path}
              className='mr-3 rounded-circle'
            />
          ) : (
            <div className='mr-3'></div>
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

  render() {
    return (
      <Fragment>
        {this.state.isOpened ? (
          <div
            className='modal in'
            id='movieModal'
            tabIndex='-1'
            role='dialog'
            aria-labelledby='movieModalLabel'
            aria-hidden='true'>
            {this.state.dataIsReady ? (
              <div
                className='modal-dialog modal-dialog-scrollable modal-lg'
                role='document'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h5 className='modal-title' id='movieModalLabel'>
                      {this.getTitle()}
                    </h5>
                    <button
                      type='button'
                      className='close'
                      data-dismiss='modal'
                      aria-label='Close'>
                      <span aria-hidden='true'>&times;</span>
                    </button>
                  </div>
                  <div className='modal-body container'>
                    <div className='row'>
                      <img
                        src={this.getPoster()}
                        alt='poster'
                        className='col-md-3 my-1'
                      />
                      <div className='col my-1'>
                        <h4>Overview:</h4>
                        {this.getOverview()}
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-3 my-3'>
                        <strong>Duration:</strong> {this.getRuntime()} mins
                        <br />
                        <strong>Genre:</strong> {this.getGenres()}
                        <br />
                        <strong>Company:</strong> {this.getCompanies()}
                        <br />
                      </div>
                      <div className='col my-3'>
                        <h4>Cast:</h4>
                        <ul className='list-unstyled'>{this.getCast()}</ul>
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
export default MovieModal
