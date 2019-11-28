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

  getDropdown = () => {
    const dropdown = (
      <Fragment>
        {this.state.data.total_results >= 1 ? (
          this.state.data.results.slice(0, 5).map(result => (
            <a key={result.id + 'a'} href={`/movie/${result.id}`} className='text-decoration-none'>
              <li
                key={result.id + 'li'}
                className='my-1 text-nowrap d-inline-block text-truncate'
                style={{ maxWidth: '365px' }}>
                {result.poster_path ? (
                  <img
                    alt={result.title}
                    key={result.id + 'img'}
                    src={`https://image.tmdb.org/t/p/w45${result.poster_path}`}
                  />
                ) : (
                  <svg width='45' height='62'>
                    <circle cx='45' cy='45' r='45' fill='#D5D8DC' />
                    Sorry, your browser does not support inline SVG.
                  </svg>
                )}
                <span key={result.id + 'span'} className='mx-1'>
                  {result.title} ({result.release_date ? result.release_date.match(/[0-9]{4}/) : 'unknown'})
                </span>
              </li>
            </a>
          ))
        ) : (
          <p className='my-1'>no results found...</p>
        )}
      </Fragment>
    )
    return dropdown
  }

  setKeywordInInput = event => {
    this.setState({ keyword: event.target.value })
    if (event.target.value.length > 3) {
      this.getTmdbApi() // send request to api only after 3 characters
      this.setState({ dropdownIsopened: true })
    }
    console.log(this.state.keyword) // _TODO: remove this before merge
  }

  closeDropdown = () => {
    this.setState({ dropdownIsopened: false })
  }

  render() {
    return (
      <Fragment>
        <div>
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
                <div className='bg-light w-auto text-dark position-absolute py-2 px-2' style={{ zIndex: 1 }}>
                  <ul className='list-unstyled'>{this.getDropdown()}</ul>
                </div>
              ) : null}
            </Fragment>
          ) : null}
        </div>
      </Fragment>
    )
  }
}
export default SearchForm
