import React, { Component } from 'react'
import mockedResponse from '../mocked-response.json'

class TrendingMovie extends Component {
  state = {
    response: mockedResponse.results,
    value: this.props.value
  }

  parseJson = () => {
    const response = this.state.response[this.state.value]
    console.log(response)
  }

  getPoster = () => {
    const poster =
      'https://image.tmdb.org/t/p/w342' +
      this.state.response[this.state.value].poster_path
    return poster
  }

  getTitle = () => {
    const title = this.state.response[this.state.value].title
    return title
  }

  getLink = () => {
    const link =
      'https://www.themoviedb.org/movie/' +
      this.state.response[this.state.value].id
    return link
  }

  getOverview = () => {
    const overview = this.state.response[this.state.value].overview
    return overview
  }

  getRating = () => {
    const rating = this.state.response[this.state.value].vote_average
    return rating
  }

  render() {
    return (
      <div className="col">
        <div className="card bg-dark shadow-lg" style={{ width: '342px' }}>
          {this.parseJson()}
          <div>
            <div
              class="badge-pill badge-warning"
              style={{ position: 'absolute' }}
            >
              ★{this.getRating()}/10
            </div>
            <img
              className="card-img-top"
              alt="movie poster"
              src={this.getPoster()}
            />
          </div>
          <div className="card-body">
            <h2 className="display-4">{this.getTitle()}</h2>
            <p>{this.getOverview()}</p>
            <a className="btn btn-warning btn-sm" href={this.getLink()}>
              Check out {this.getTitle()}!
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default TrendingMovie
