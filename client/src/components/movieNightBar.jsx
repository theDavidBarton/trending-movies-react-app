import React, { useState, Fragment } from 'react'
import i18n from './../i18n.json'

export default function MovieNightBar({ lang, pollId }) {
  const [labels] = useState(i18n.pollBar)
  const [isOpened, setIsOpened] = useState(pollId)

  const closeIt = () => {
    setIsOpened(false)
    window.location.search = window.location.search.replace(/(\?|&)(poll=)(\d+)((&)|($))/, '')
  }

  return (
    <Fragment>
      {isOpened ? (
        <div className='bg-success sticky-top py-4'>
          <div className='container'>
            <span>
              {labels.text[lang]}{' '}
              <a className='text-light' href={`/${lang}/movienight/${pollId}?poll=${pollId}`}>
                [{pollId}]
              </a>
            </span>
            <button onClick={closeIt} type='button' className='float-right btn btn-dark btn-sm' aria-label='Exit'>
              <span>EXIT</span>
            </button>
          </div>
        </div>
      ) : null}
    </Fragment>
  )
}
