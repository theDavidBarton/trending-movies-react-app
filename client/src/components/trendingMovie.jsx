import React, { Component } from 'react'

class TrendingMovie extends Component {
  state = {
    response: this.props.data,
    value: this.props.value,
    selectedMovie: this.props.selectedMovie
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

  selectedMovie = () => {
    const movie = `/movie/${this.state.response.results[this.state.value].id}`
    return movie
  }

  render() {
    return (
      <div className='col-md-4'>
        <a href={this.selectedMovie()} className='text-decoration-none'>
          <div className='card bg-dark text-white border-0'>
            <div>
              <div className='img-zoom-container'>
                <div className='img-zoom'>
                  <img className='card-img-top' alt='movie poster' src={this.getPoster()} />
                </div>
              </div>
              <div className='badge-pill badge-warning position-absolute mt-4 right-badge'>★{this.getRating()}/10</div>
            </div>
            <div className='card-body'>
              <div className='badge-pill badge-danger display-4 position-absolute badge-position'>
                #<strong>{this.getRank()}</strong>
              </div>
              <h2>{this.getTitle()}</h2>
              <p>{this.getOverview()}</p>
            </div>
          </div>
        </a>
      </div>
    )
  }
}

export default TrendingMovie
