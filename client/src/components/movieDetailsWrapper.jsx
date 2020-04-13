import React, { useState, Fragment } from 'react'
import MovieDetails from './movieDetails'

export default function MovieDetailsWrapper(props) {
  const selectedMovie = useState(props.match.params.id)

  return <Fragment>{selectedMovie ? <MovieDetails lang={props.lang} selectedMovie={selectedMovie} /> : null}</Fragment>
}
