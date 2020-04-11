import React, { Component } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import CookieBar from './cookieBar'
import Header from './header'
import Footer from './footer'
import HomepageWrapper from './homepageWrapper'
import MovieDetailsWrapper from './movieDetailsWrapper'
import Page404 from './404'

class App extends Component {
  state = {
    lang: 'en'
  }

  swapLangEn = () => {
    this.setState({ lang: 'en' })
  }
  swapLangSv = () => {
    this.setState({ lang: 'sv' })
  }

  render() {
    return (
      <div className='App'>
        <nav className='position-absolute lang-position'>
          <button
            onClick={this.swapLangEn}
            className={this.state.lang === 'en' ? 'btn btn-light' : 'btn btn-outline-light'}>
            en
          </button>{' '}
          <button
            onClick={this.swapLangSv}
            className={this.state.lang === 'sv' ? 'btn btn-light' : 'btn btn-outline-light'}>
            sv
          </button>
        </nav>
        <CookieBar lang={this.state.lang} />
        <Header lang={this.state.lang} />
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={props => <HomepageWrapper {...props} lang={this.state.lang} />} />
            <Route path='/movie/:id' render={props => <MovieDetailsWrapper {...props} lang={this.state.lang} />} />
            <Route component={Page404} />
          </Switch>
        </BrowserRouter>
        <Footer lang={this.state.lang} />
      </div>
    )
  }
}

export default App
