import React, { Component } from 'react'

class TrendingMovieSkeletonLoading extends Component {
  render() {
    return (
      <div className='col'>
        <div
          className='card bg-dark'
          style={{ width: '342px', borderStyle: 'none' }}>
          <div>
            <img
              className='card-img-top'
              alt='movie poster'
              src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
            />
          </div>
          <div className='card-body text-muted'>
            <h2 className='display-4'>████████</h2>
            <p>
              █████████████████████████████████████████████████████████████████████████████
              █████████████████████████████████████████████████████████████████████████████
              ████████████████████████████████████
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default TrendingMovieSkeletonLoading
