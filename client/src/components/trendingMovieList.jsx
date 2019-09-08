import React, { Component } from 'react'
import TrendingMovie from './trendingMovie'

class TrendingMovieList extends Component {
  state = {
    data: null,
    dataIsReady: false,
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

  componentDidMount() {
    this.getTmdbApi()
  }

  getTmdbApi = async () => {
    try {
      const response = await fetch('/api/trending')
      const json = await response.json()
      this.setState({ data: json, dataIsReady: true })
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    return (
      <div
        className='bg-dark'
        style={{ paddingBottom: '50px', paddingTop: '25px' }}>
        {this.state.dataIsReady ? (
          <div className='container'>
            <div className='row'>
              {this.state.topMovieCount.map(movies => (
                <TrendingMovie
                  key={movies.id}
                  value={movies.value}
                  data={this.state.data}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className='container'>
            <h2 className='text-warning row'>Loading...</h2>
          </div>
        )}
      </div>
    )
  }
}

export default TrendingMovieList
