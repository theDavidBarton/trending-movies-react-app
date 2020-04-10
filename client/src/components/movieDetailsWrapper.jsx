import React, { Component, Fragment } from 'react'
import CookieBar from './cookieBar'
import Header from './header'
import Footer from './footer'
import MovieDetails from './movieDetails'

class MovieDetailsWrapper extends Component {
  state = {
    data: null,
    dataIsReady: false,
    selectedMovie: this.props.match.params.id,
    lang: 'en'
  }

  render() {
    return (
      <Fragment>
        {this.state.selectedMovie ? (
          <div>
            <CookieBar />
            <Header lang={this.state.lang} />
            <MovieDetails selectedMovie={this.state.selectedMovie} />
            <Footer />
          </div>
        ) : null}
      </Fragment>
    )
  }
}

export default MovieDetailsWrapper
