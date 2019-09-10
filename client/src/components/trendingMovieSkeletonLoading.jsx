import React, { Component } from 'react'

class TrendingMovieSkeletonLoading extends Component {
  render() {
    return (
      <div className='col-sm-4 col-xs-1'>
        <div
          className='card bg-dark'
          style={{ width: '342px', borderStyle: 'none' }}>
          <div className='text-center'>
            <div
              className='spinner-border text-warning justify-content-center'
              style={{ width: '5rem', height: '5rem' }}
              role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
            <img
              className='card-img-top'
              alt='movie poster'
              src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
            />
          </div>
          <div className='card-body text-muted'>
            <h2>████████</h2>
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
