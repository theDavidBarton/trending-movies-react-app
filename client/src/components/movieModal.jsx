import React, { Component } from 'react'

class MovieModal extends Component {
  state = {
    data: null,
    dataIsReady: false,
    id: 453,
    isOpened: true
  }

  openIt = () => {
    this.setState({ isOpened: true })
  }

  closeIt = () => {
    this.setState({ isOpened: false })
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

  getBackground = () => {
    const background = this.state.data.backdrop_path
    return background
  }

  getCast = () => {
    const castArray = this.state.data.credits.cast
    const cast = castArray.map(castMember => castMember.name + ', ')
    return cast
  }

  render() {
    return (
      <React.Fragment>
        {this.state.isOpened ? (
          <div
            className='modal'
            id='movieModal'
            tabIndex='-1'
            role='dialog'
            aria-labelledby='movieModalLabel'
            aria-hidden='true'>
            {this.state.dataIsReady ? (
              <div className='modal-dialog' role='document'>
                <div className='modal-content'>
                  <div
                    className='modal-header'
                    style={{
                      backgroundImage:
                        'url(https://image.tmdb.org/t/p/w300' +
                        this.getBackground() +
                        ')'
                    }}>
                    <h5 className='modal-title' id='movieModalLabel'>
                      {this.getTitle()}
                    </h5>
                    <button
                      onClick={this.closeIt}
                      type='button'
                      className='close'
                      data-dismiss='modal'
                      aria-label='Close'>
                      <span aria-hidden='true'>&times;</span>
                    </button>
                  </div>
                  <div className='modal-body'>
                    {this.getOverview()}
                    <br />
                    <strong>Cast:</strong> {this.getCast()}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </React.Fragment>
    )
  }
}
export default MovieModal
