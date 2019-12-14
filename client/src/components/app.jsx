import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import HomepageWrapper from './homepageWrapper'
import MovieDetailsWrapper from './movieDetailsWrapper'
import Page404 from './404'

class App extends Component {
  state = {
    data: null,
    dataIsReady: false,
    backdropPath: null
  }

  componentDidMount() {
    this.getTmdbApi()
  }

  getTmdbApi = async () => {
    try {
      const response = await fetch('/api/trending')
      const json = await response.json()
      this.setState({ data: json, dataIsReady: true })
      this.getBackground()
    } catch (e) {
      console.error(e)
    }
  }

  getBackground = () => {
    const background = this.state.data.results[2].backdrop_path
    this.setState({ backdropPath: background })
  }

  render() {
    return (
      <div className='App'>
        <Switch>
          <Route
            exact
            path='/'
            component={() => (
              <HomepageWrapper
                data={this.state.data}
                dataIsReady={this.state.dataIsReady}
                backdropPath={this.state.backdropPath}
              />
            )}
          />
          <Route
            path='/movie/:id'
            component={() => (
              <MovieDetailsWrapper
                data={this.state.data}
                dataIsReady={this.state.dataIsReady}
                backdropPath={this.state.backdropPath}
              />
            )}
          />
          <Route component={Page404} />
        </Switch>
      </div>
    )
  }
}

export default App
