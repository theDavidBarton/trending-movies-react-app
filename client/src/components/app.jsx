import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import HomepageWrapper from './homepageWrapper'
import MovieDetailsWrapper from './movieDetailsWrapper'
import Page404 from './404'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Switch>
          <Route exact path='/' component={HomepageWrapper} />
          <Route path='/movie/:id' component={MovieDetailsWrapper} />
          <Route component={Page404} />
        </Switch>
      </div>
    )
  }
}

export default App
