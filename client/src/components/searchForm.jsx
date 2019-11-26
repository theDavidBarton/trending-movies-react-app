import React, { Component, Fragment } from 'react'

class SearchForm extends Component {
  state = {
    data: null,
    dataIsReady: false,
    keyword: 'Shining' // hardcoded input query string for development
  }

  componentDidMount() {
    this.getTmdbApi()
  }

  getTmdbApi = async () => {
    try {
      const response = await fetch(`/api/movieAutocomplete?q=${this.state.keyword.toLowerCase()}`)
      const json = await response.json()
      this.setState({ data: json, dataIsReady: true })
    } catch (e) {
      console.error(e)
    }
  }

  parseJson = () => {
    const response = this.state.data.results[0]
    console.log(response)
  }

  getTitle = () => {
    const title = this.state.data.results[0].title
    console.log(this.state.data)
    return title
  }

  getReleaseYear = () => {
    const releaseYear = this.state.data.results[0].release_date.match(/[0-9]{4}/)
    return releaseYear
  }
  render() {
    return (
      <Fragment>
        {this.parseJson()}
        <input className='form-control' type='text' placeholder='Type a movie name…' readOnly />
      </Fragment>
    )
  }
}
export default SearchForm
