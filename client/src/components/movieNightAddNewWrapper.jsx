import React from 'react'
import { useParams } from 'react-router-dom'
import MovieNightAddNew from './movieNightAddNew'

export default function MovieNightWrapper() {
  const { lang } = useParams()
  return <MovieNightAddNew lang={lang} />
}
