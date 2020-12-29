import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import MovieNight from './movieNight'

export default function MovieNightWrapper() {
  const { id, lang } = useParams()
  return <Fragment>{id ? <MovieNight lang={lang} selectedPoll={id} /> : null}</Fragment>
}
