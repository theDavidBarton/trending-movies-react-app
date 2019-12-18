import React, { Component, Fragment } from 'react'
import CookieBar from './cookieBar'
import Header from './header'
import Footer from './footer'
import MovieDetails from './movieDetails'
import { withRouter } from 'react-router'

class MovieDetailsWrapper extends Component {
  state = {
    data: this.props.data,
    dataIsReady: this.props.dataIsReady,
    backdropPath: this.props.backdropPath,
    selectedMovie: 461130, // this.props.match.params.id
    test: console.log(withRouter(MovieDetails)),
    test2: console.log(withRouter(Header))
  }

  render() {
    return (
      <Fragment>
        {this.state.selectedMovie ? (
          <div>
            <CookieBar />
            <Header
              data={this.state.data}
              dataIsReady={this.state.dataIsReady}
              selectedMovie={this.state.selectedMovie}
            />
            <MovieDetails selectedMovie={this.state.selectedMovie} />
            <Footer />
          </div>
        ) : null}
      </Fragment>
    )
  }
}

export default MovieDetailsWrapper
