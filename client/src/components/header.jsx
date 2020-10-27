import React, { useState, useEffect, useCallback } from 'react'
import SearchForm from './searchForm'
import logo from './../img/logo-big.svg'
import github from './../img/github.svg'
import linkedin from './../img/linkedin.png'
import i18n from './../i18n.json'

export default function Header({ lang }) {
  const [data, setData] = useState(null)
  const [dataIsReady, setDataIsReady] = useState(false)
  const [labels] = useState(i18n.header)

  const getTmdbApi = useCallback(async () => {
    try {
      const response = await fetch(`/api/${lang}/topRatedRecommended`)
      const json = await response.json()
      setData(json)
      setDataIsReady(true)
    } catch (e) {
      console.error(e)
    }
  }, [lang])

  useEffect(() => {
    getTmdbApi()
  }, [getTmdbApi])

  const getBackground = () => {
    const background = data.backdrop_path
    return background
  }

  const imagePlacement = dataIsReady
    ? 'linear-gradient(0deg, rgba(52,58,64,1) 0%, rgba(52,58,64,0) 100%), url(https://image.tmdb.org/t/p/w1280' +
      getBackground() +
      ')'
    : 'url(data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==)'

  return (
    <div
      className='bg-dark pb-3'
      style={{
        backgroundImage: imagePlacement,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}>
      <div className='container text-white'>
        <div className='row justify-content-md-center'>
          <div className='col'>
            <a href={`/${lang + window.location.search}`}>
              <img className='img-fluid text-center resized-logo' src={logo} alt='logo' />
            </a>
          </div>
          <div className='col-md-auto col-12 align-self-end order-1 order-md-0'>
            <SearchForm lang={lang} labels={labels} />
            <h1 className='d-none d-md-block'>{labels.inputLabel[lang]}</h1>
          </div>
          <div className='col-auto align-self-end my-2 d-none d-lg-block'>
            <ul className='list-unstyled align-bottom social-list-margin'>
              <li className='my-2'>
                <a
                  href='https://github.com/theDavidBarton'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn btn-light social-link-style'>
                  <img className='float-left social-img-style' alt='github logo' src={github} />
                  GitHub
                </a>
              </li>
              <li className='my-2'>
                <a
                  href='https://linkedin.com/in/theDavidBarton/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn btn-light float-left social-link-style'>
                  <img className='float-left social-img-style' alt='linkedin logo' src={linkedin} />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
