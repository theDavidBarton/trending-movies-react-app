import React, { useState } from 'react'
import TrendingMovie from './trendingMovie'
import TrendingMovieSkeletonLoading from './trendingMovieSkeletonLoading'

export default function TrendingMovieList(props) {
  const [topMovieCount] = useState([
    { id: 1, value: 0 },
    { id: 2, value: 1 },
    { id: 3, value: 2 },
    { id: 4, value: 3 },
    { id: 5, value: 4 },
    { id: 6, value: 5 },
    { id: 7, value: 6 },
    { id: 8, value: 7 },
    { id: 9, value: 8 }
  ])

  return (
    <div className='bg-dark py-2'>
      {props.dataIsReady ? (
        <div className='container'>
          <div className='row'>
            {topMovieCount.map(movies => (
              <TrendingMovie
                lang={props.lang}
                key={movies.id}
                value={movies.value}
                data={props.data}
                selectedMovie={props.selectedMovie}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className='container'>
          <div className='row'>
            {topMovieCount.map(movies => (
              <TrendingMovieSkeletonLoading key={movies.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
