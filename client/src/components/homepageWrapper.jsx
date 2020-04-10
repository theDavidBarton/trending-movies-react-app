import React, { Component } from 'react'
import CookieBar from './cookieBar'
import Header from './header'
import Footer from './footer'
import TrendingMovieList from './trendingMovieList'

class HomepageWrapper extends Component {
  state = {
    data: null,
    dataIsReady: false,
    lang: 'en'
  }

  componentDidMount() {
    this.getTmdbApi()
  }

  getTmdbApi = async () => {
    try {
      const response = await fetch(`/api/${this.state.lang}/trending`)
      const json = await response.json()
      this.setState({ data: json, dataIsReady: true })
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    return (
      <div>
        <CookieBar />
        <Header lang={this.state.lang} />
        <TrendingMovieList lang={this.state.lang} data={this.state.data} dataIsReady={this.state.dataIsReady} />
        <Footer />
      </div>
    )
  }
}

export default HomepageWrapper
