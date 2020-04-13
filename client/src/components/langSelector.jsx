import React from 'react'

export default function LangSelector({ lang, currentLang }) {
  const switchLanguage = () => {
    // market will be sliced from path, e.g.: '/en' or '/sv'
    const marketPath = window.location.pathname.slice(0, 3)
    const finalPath = window.location.pathname.replace(marketPath, `/${currentLang}`)
    return finalPath
  }

  return (
    <a href={switchLanguage()} className={lang === currentLang ? 'btn btn-light' : 'btn btn-outline-light'}>
      {currentLang}
    </a>
  )
}
