import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import MovieDetails from './movieDetails'

export default function MovieDetailsWrapper() {
  const { id, lang } = useParams()
  return <Fragment>{id ? <MovieDetails lang={lang} selectedMovie={id} /> : null}</Fragment>
}
