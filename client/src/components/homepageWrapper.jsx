import React, { Component } from 'react'
import CookieBar from './cookieBar'
import Header from './header'
import Footer from './footer'
import TrendingMovieList from './trendingMovieList'

class HomepageWrapper extends Component {
  state = {
    data: this.props.data,
    dataIsReady: this.props.dataIsReady,
    backdropPath: this.props.backdropPath
  }

  render() {
    return (
      <div>
        {<CookieBar />}
        {
          <Header
            data={this.state.data}
            dataIsReady={this.state.dataIsReady}
            selectedMovie={this.state.selectedMovie}
            backdropPath={this.state.backdropPath}
          />
        }
        {<TrendingMovieList data={this.state.data} dataIsReady={this.state.dataIsReady} />}
        {<Footer />}
      </div>
    )
  }
}

export default HomepageWrapper
