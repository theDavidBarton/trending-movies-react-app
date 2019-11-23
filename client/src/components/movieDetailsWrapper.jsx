import React, { Component } from 'react'
import CookieBar from './cookieBar'
import Header from './header'
import Footer from './footer'
import MovieDetails from './movieDetails'

class MovieDetailsWrapper extends Component {
  state = {
    data: null,
    dataIsReady: false,
    selectedMovie: 380 // null | mocked movie ID; it should be handled with a function inside trendingMovieList.jsx !!!
  }

  componentDidMount() {
    this.getTmdbApi()
  }

  getTmdbApi = async () => {
    try {
      const response = await fetch('/api/trending')
      const json = await response.json()
      this.setState({ data: json, dataIsReady: true })
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    return (
      <div>
        {<CookieBar />}
        {
          <Header
            data={this.state.data}
            dataIsReady={this.state.dataIsReady}
            selectedMovie={this.state.selectedMovie}
          />
        }
        {<MovieDetails selectedMovie={this.state.selectedMovie} />}
        {<Footer />}
      </div>
    )
  }
}

export default MovieDetailsWrapper
