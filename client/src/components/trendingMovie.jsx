import React, { Component } from 'react'

class TrendingMovie extends Component {
  state = {
    response: this.props.data,
    value: this.props.value,
    selectedMovie: this.props.selectedMovie
  }

  parseJson = () => {
    const response = this.state.response.results[this.state.value]
    console.log(response)
  }

  getPoster = () => {
    const poster = 'https://image.tmdb.org/t/p/w342' + this.state.response.results[this.state.value].poster_path
    return poster
  }

  getTitle = () => {
    const title = this.state.response.results[this.state.value].title
    return title
  }

  getLink = () => {
    const link = 'https://www.themoviedb.org/movie/' + this.state.response.results[this.state.value].id
    return link
  }

  getOverview = () => {
    const overview = this.state.response.results[this.state.value].overview
    return overview
  }

  getRating = () => {
    const rating = this.state.response.results[this.state.value].vote_average
    return rating
  }

  getRank = () => {
    const rank = this.state.value + 1
    return rank
  }

  setSelectedMovie = () => {
    this.setState({
      selectedMovie: this.state.response.results[this.state.value].id
    })
  }

  render() {
    return (
      <div className='col-sm-4 col-xs-1'>
        <div type='button' data-toggle='modal' data-target='#movieDetails'>
          <div className='card bg-dark text-white' style={{ borderStyle: 'none' }}>
            {this.parseJson()}
            <div>
              <img className='card-img-top' alt='movie poster' src={this.getPoster()} />
              <div className='badge-pill badge-warning' style={{ position: 'absolute', right: 0 }}>
                ★{this.getRating()}/10
              </div>
            </div>
            <div className='card-body'>
              <div
                className='badge-pill badge-danger display-4'
                style={{ position: 'absolute', left: '20px', top: '20px' }}>
                #<strong>{this.getRank()}</strong>
              </div>
              <h2>{this.getTitle()}</h2>
              <p>{this.getOverview()}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TrendingMovie
