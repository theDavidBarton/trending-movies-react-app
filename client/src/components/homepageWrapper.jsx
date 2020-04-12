import React, { Component } from 'react'
import TrendingMovieList from './trendingMovieList'

class HomepageWrapper extends Component {
  state = {
    data: null,
    dataIsReady: false
  }

  componentDidMount() {
    this.getTmdbApi()
  }

  componentDidUpdate(prevProps) {
    if (this.props.lang !== prevProps.lang) {
      this.getTmdbApi()
    }
  }

  getTmdbApi = async () => {
    try {
      const response = await fetch(`/api/${this.props.lang}/trending`)
      const json = await response.json()
      this.setState({ data: json, dataIsReady: true })
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    return <TrendingMovieList lang={this.props.lang} data={this.state.data} dataIsReady={this.state.dataIsReady} />
  }
}

export default HomepageWrapper
