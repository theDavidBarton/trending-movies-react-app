import React, { Component, Fragment } from 'react'

class SearchForm extends Component {
  state = {
    data: null,
    dataIsReady: false,
    dropdownIsopened: true,
    keyword: 'Scary Movie' // hardcoded input query string for development
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
        {this.state.data.results.slice(0, 5).map(result => (
          <a key={result.id + 'a'} href={`/movie/${result.id}`} className='text-decoration-none'>
            <li key={result.id + 'li'} className='my-1'>
              <img
                key={result.id + 'img'}
                src={result.poster_path ? `https://image.tmdb.org/t/p/w45${result.poster_path}` : null}
              />
              <span key={result.id + 'span'} className='mx-1'>
                {result.title} ({result.release_date.match(/[0-9]{4}/)})
              </span>
            </li>
          </a>
        ))}
      </Fragment>
    )
    return dropdown
  }
  // https://stackoverflow.com/questions/36683770/how-to-get-the-value-of-an-input-field-using-reactjs

  /* _E X A M P L E :
   * var Component = React.createClass({
   * getInitialState: function() {
   *   return {
   *     inputValue: ''
   *  };
   * },
   *
   * render: function() {
   *   return (
   *    //...
   *   <input value={this.state.inputValue} onChange={this.updateInputValue}/>
   *    //...
   *   );
   *  },
   *
   *  updateInputValue: function(evt) {
   *   this.setState({
   *    inputValue: evt.target.value
   *  });
   *  }
   * });
   */

  render() {
    return (
      <Fragment>
        <input
          className='form-control'
          type='text'
          placeholder='Type a movie name…'
          value={this.state.keyword}
          onChange={''}
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
