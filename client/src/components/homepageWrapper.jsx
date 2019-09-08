import React, { Component } from 'react'
import CookieBar from './cookieBar'
import Header from './header'
import Footer from './footer'
import TrendingMovieList from './trendingMovieList'

class HomepageWrapper extends Component {
  render() {
    return (
      <div>
        {<CookieBar />}
        {<Header />}
        {<TrendingMovieList />}
        {<Footer />}
      </div>
    )
  }
}

export default HomepageWrapper
