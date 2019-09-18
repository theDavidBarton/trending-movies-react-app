import React, { Component } from 'react'
import TrendingMovie from './trendingMovie'
import TrendingMovieSkeletonLoading from './trendingMovieSkeletonLoading'

class TrendingMovieList extends Component {
  state = {
    topMovieCount: [
      { id: 1, value: 0 },
      { id: 2, value: 1 },
      { id: 3, value: 2 },
      { id: 4, value: 3 },
      { id: 5, value: 4 },
      { id: 6, value: 5 },
      { id: 7, value: 6 },
      { id: 8, value: 7 },
      { id: 9, value: 8 }
    ]
  }

  render() {
    return (
      <div
        className='bg-dark'
        style={{ paddingBottom: '50px', paddingTop: '25px' }}>
        {this.props.dataIsReady ? (
          <div className='container'>
            <div className='row'>
              {this.state.topMovieCount.map(movies => (
                <TrendingMovie
                  key={movies.id}
                  value={movies.value}
                  data={this.props.data}
                  selectedMovie={this.props.selectedMovie}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className='container'>
            <div className='row'>
              {this.state.topMovieCount.map(movies => (
                <TrendingMovieSkeletonLoading key={movies.id} />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default TrendingMovieList
