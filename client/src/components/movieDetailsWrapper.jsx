import React, { Component, Fragment } from 'react'
import MovieDetails from './movieDetails'

class MovieDetailsWrapper extends Component {
  state = {
    selectedMovie: this.props.match.params.id
  }

  render() {
    return (
      <Fragment>
        {this.state.selectedMovie ? (
          <MovieDetails lang={this.props.lang} selectedMovie={this.state.selectedMovie} />
        ) : null}
      </Fragment>
    )
  }
}

export default MovieDetailsWrapper
