import React, { useState, Fragment } from 'react'
import dompurify from 'dompurify'
import i18n from './../i18n.json'

export default function HomepageHeadingBox({ lang }) {
  const [labels] = useState(i18n.homepageHeadingBox)
  return (
    <Fragment>
      <div className='bg-dark text-light'>
        <div className='container'>
          <div className='row'>
            <h1
              className='col'
              dangerouslySetInnerHTML={{
                __html: dompurify.sanitize(labels.heading[lang])
              }}></h1>
            <p className='alert alert-warning mx-3 w-50'>{labels.warning[lang]}</p>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
