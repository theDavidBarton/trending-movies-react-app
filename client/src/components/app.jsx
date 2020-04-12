import React, { useState } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import CookieBar from './cookieBar'
import Header from './header'
import Footer from './footer'
import HomepageWrapper from './homepageWrapper'
import MovieDetailsWrapper from './movieDetailsWrapper'
import Page404 from './404'
import LangSelector from './langSelector'

export default function App() {
  const [lang, setLang] = useState('en')

  const swapLangEn = () => {
    setLang('en')
  }
  const swapLangSv = () => {
    setLang('sv')
  }

  return (
    <div className='App'>
      <nav className='position-absolute lang-position'>
        <LangSelector onClick={swapLangEn} lang={lang} currentLang='en' />{' '}
        <LangSelector onClick={swapLangSv} lang={lang} currentLang='sv' />
      </nav>
      <CookieBar lang={lang} />
      <Header lang={lang} />
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={props => <HomepageWrapper {...props} lang={lang} />} />
          <Route path='/movie/:id' render={props => <MovieDetailsWrapper {...props} lang={lang} />} />
          <Route component={Page404} />
        </Switch>
      </BrowserRouter>
      <Footer lang={lang} />
    </div>
  )
}
