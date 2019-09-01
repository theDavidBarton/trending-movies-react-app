import React, { Component } from 'react'
import TrendingMovie from './trendingMovie'

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
        className="bg-dark"
        style={{ paddingBottom: '50px', paddingTop: '25px' }}
      >
        <div className="container">
          <div className="row">
            {this.state.topMovieCount.map(movies => (
              <TrendingMovie key={movies.id} value={movies.value} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default TrendingMovieList
