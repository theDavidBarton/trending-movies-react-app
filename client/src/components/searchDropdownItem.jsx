import React, { useState, Fragment } from 'react'
import i18n from './../i18n.json'

export default function SearchDropdownItem({ result, lang }) {
  return (
    <Fragment>
      <a key={result.id + 'a'} href={`/${lang}/movie/${result.id}`} className='text-decoration-none'>
        <li key={result.id + 'li'} className='my-1 text-nowrap d-inline-block text-truncate result-list-width'>
          {result.poster_path ? (
            <img alt={result.title} key={result.id + 'img'} src={`https://image.tmdb.org/t/p/w45${result.poster_path}`} />
          ) : (
            <svg width='45' height='68'>
              <circle cx='45' cy='45' r='45' fill='#D5D8DC' />
              Sorry, your browser does not support inline SVG.
            </svg>
          )}
          <span key={result.id + 'span'} className='mx-1'>
            {result.title} ({result.release_date ? result.release_date.match(/[0-9]{4}/) : 'unknown'})
          </span>
        </li>
      </a>
    </Fragment>
  )
}

export function SearchDropdownItemNoResult({ lang }) {
  const [labels] = useState(i18n.header)
  return (
    <li className='my-1 text-nowrap d-inline-block text-truncate result-list-width'>
      <span className='mx-1'>{labels.inputNoresults[lang]}</span>
    </li>
  )
}
