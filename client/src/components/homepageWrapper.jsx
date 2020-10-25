import React, { useState, useEffect, Fragment, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import TrendingMovieList from './trendingMovieList'
import HomepageHeadingBox from './homepageHeadingBox'
import pollParamFinder from './../lib/pollParamFinder'

export default function HomepageWrapper() {
  const [data, setData] = useState(null)
  const [dataIsReady, setDataIsReady] = useState(false)
  const { lang } = useParams()
  const [pollId] = useState(pollParamFinder() || null)

  const getTmdbApi = useCallback(async () => {
    try {
      const response = await fetch(`/api/${lang}/trending`)
      const json = await response.json()
      setData(json)
      setDataIsReady(true)
    } catch (e) {
      console.error(e)
    }
  }, [lang])

  useEffect(() => {
    getTmdbApi()
  }, [lang, getTmdbApi])

  return (
    <Fragment>
      <HomepageHeadingBox lang={lang} />
      <TrendingMovieList lang={lang} data={data} dataIsReady={dataIsReady} pollId={pollId} />
    </Fragment>
  )
}
