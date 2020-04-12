import React from 'react'

export default function LangSelector({ onClick, lang, currentLang }) {
  return (
    <button onClick={onClick} className={lang === currentLang ? 'btn btn-light' : 'btn btn-outline-light'}>
      {currentLang}
    </button>
  )
}
