import React, { Component, Fragment } from 'react'

class SearchForm extends Component {
  state = {
    data: null,
    dataIsReady: false,
    dropdownIsopened: false,
    keyword: ''
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

  selectedMovie = () => {
    const movie = '/movie/' + this.state.response.results[0].id
    return movie
  }

  getDropdown = () => {
    const dropdown = (
      <Fragment>
        {this.state.data.total_results >= 1 ? (
          this.state.data.results.slice(0, 5).map(result => (
            <a key={result.id + 'a'} href={`/movie/${result.id}`} className='text-decoration-none'>
              <li key={result.id + 'li'} className='my-1'>
                <img
                  alt={result.title}
                  key={result.id + 'img'}
                  src={result.poster_path ? `https://image.tmdb.org/t/p/w45${result.poster_path}` : null}
                />
                <span key={result.id + 'span'} className='mx-1'>
                  {result.title} ({result.release_date.match(/[0-9]{4}/)})
                </span>
              </li>
            </a>
          ))
        ) : (
          <p>no results found...</p>
        )}
      </Fragment>
    )
    return dropdown
  }

  setKeywordInInput = event => {
    this.setState({ keyword: event.target.value })
    if (event.target.value.length > 3) {
      this.getTmdbApi() // save some requests from sending during typing
      this.setState({ dropdownIsopened: true })
    }
    console.log(this.state.keyword)
  }

  render() {
    return (
      <Fragment>
        <input
          className='form-control'
          type='text'
          placeholder='Type a movie name…'
          value={this.state.keyword}
          onChange={this.setKeywordInInput}
        />
        {this.state.dataIsReady ? (
          <Fragment>
            {this.state.dropdownIsopened ? (
              <div className='bg-light text-dark position-absolute py-2 px-2' style={{ zIndex: 1 }}>
                <ul className='list-unstyled'>{this.getDropdown()}</ul>
              </div>
            ) : null}
          </Fragment>
        ) : null}
      </Fragment>
    )
  }
}
export default SearchForm
