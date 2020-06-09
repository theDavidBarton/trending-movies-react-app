import React, { useState, Fragment } from 'react'
import dompurify from 'dompurify'
import i18n from './../i18n.json'

export default function CookieBar({ lang }) {
  const [labels] = useState(i18n.cookieBar)
  const [isOpened, setIsOpened] = useState(true)

  const closeIt = () => {
    setIsOpened(false)
  }

  return (
    <Fragment>
      {isOpened ? (
        <div className='bg-warning fixed-bottom py-2'>
          <div className='container'>
            <span
              dangerouslySetInnerHTML={{
                __html: dompurify.sanitize(labels.text[lang])
              }}></span>
            <button onClick={closeIt} type='button' className='float-right btn btn-dark btn-sm' aria-label='Close'>
              <span>OK</span>
            </button>
          </div>
        </div>
      ) : null}
    </Fragment>
  )
}
