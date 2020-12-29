import React, { useState } from 'react'
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'
import CookieBar from './cookieBar'
import Header from './header'
import Footer from './footer'
import HomepageWrapper from './homepageWrapper'
import MovieDetailsWrapper from './movieDetailsWrapper'
import MovieNightWrapper from './movieNightWrapper'
import Page404 from './404'
import LangSelector from './langSelector'
import urlParamFinder from './../lib/urlParamFinder'
import pollParamFinder from './../lib/pollParamFinder'
import MovieNightBar from './movieNightBar'
import MovieNightAddNewWrapper from './movieNightAddNewWrapper'

export default function App() {
  const [lang] = useState(urlParamFinder() || 'en')
  const [pollId] = useState(pollParamFinder() || null)

  return (
    <div className='App'>
      <nav className='lang-position'>
        <LangSelector lang={lang} currentLang='en' /> <LangSelector lang={lang} currentLang='sv' />
      </nav>
      <MovieNightBar lang={lang} pollId={pollId} />
      <CookieBar lang={lang} />
      <Header lang={lang} />
      <BrowserRouter>
        <Switch>
          <Route exact path='/:lang' component={HomepageWrapper} />
          <Redirect exact from='/' to={`/${lang}`} />
          <Route path='/:lang/movie/:id' component={MovieDetailsWrapper} />
          <Route path='/:lang/movieNight/:id' component={MovieNightWrapper} />
          <Route path='/:lang/MovieNightAddNew' component={MovieNightAddNewWrapper} />
          <Route component={Page404} />
        </Switch>
      </BrowserRouter>
      <Footer lang={lang} />
    </div>
  )
}
