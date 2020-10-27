import React, { useState, useEffect, Fragment } from 'react'
import SearchDropdownItem, { SearchDropdownItemNoResult } from './searchDropdownItem'

export default function SearchForm({ lang, labels }) {
  const [data, setData] = useState(null)
  const [dataIsReady, setDataIsReady] = useState(false)
  const [dropdownIsopened, setDropdownIsopened] = useState(false)
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    async function getTmdbApi() {
      if (keyword !== '' && keyword.length > 2) {
        try {
          const response = await fetch(`/api/${lang}/movieAutocomplete?q=${keyword.toLowerCase()}`)
          const json = await response.json()
          setData(json)
          setDataIsReady(true)
        } catch (e) {
          console.error(e)
        }
      }
    }
    getTmdbApi()
  }, [lang, keyword])

  const setKeywordInInput = event => {
    setKeyword(event.target.value)
    setDropdownIsopened(true)
  }

  const closeDropdown = () => {
    setDropdownIsopened(false)
    setKeyword('')
  }

  return (
    <Fragment>
      <div className='position-relative' style={{ zIndex: 1 }}>
        <input
          className='form-control mt-2'
          type='text'
          placeholder={labels.inputPlaceholder[lang]}
          value={keyword}
          onChange={setKeywordInInput}
        />
        {dataIsReady ? (
          <Fragment>
            {dropdownIsopened ? (
              <div className='bg-light w-auto text-dark position-absolute py-2 px-2'>
                <ul className='list-unstyled mb-0'>
                  {data.total_results >= 1 ? (
                    // only first eight search results displayed in the dropdown
                    data.results.slice(0, 5).map(result => <SearchDropdownItem key={result.id} result={result} lang={lang} />)
                  ) : (
                    <SearchDropdownItemNoResult lang={lang} />
                  )}
                </ul>
                <div id='dropdownOverlay' onClick={closeDropdown} className='overlay-style'></div>
              </div>
            ) : null}
          </Fragment>
        ) : null}
      </div>
    </Fragment>
  )
}
