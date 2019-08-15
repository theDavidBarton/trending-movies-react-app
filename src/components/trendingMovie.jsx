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
    const poster = 'https://image.tmdb.org/t/p/w342' + this.state.response[this.state.value].poster_path
    return poster
  }

  getTitle = () => {
    const title = this.state.response[this.state.value].title
    return title
  }

  getLink = () => {
    const link = 'https://www.themoviedb.org/movie/' + this.state.response[this.state.value].id
    return link
  }

  getOverview = () => {
    const overview = this.state.response[this.state.value].overview
    return overview
  }

  render() {
    return (
      <div className="col">
        <div className="card badge-dark shadow-lg" style={{ width: '342px' }}>
          {this.parseJson()}
          <div>
            <img className="card-img-top" alt="movie poster" src={this.getPoster()} />
          </div>
          <div className="card-body">
            <h2 className="display-4">{this.getTitle()}</h2>
            <p>{this.getOverview()}</p>
            <a type="button" className="btn btn-warning" href={this.getLink()}>
              Check out {this.getTitle()}!
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default TrendingMovie
