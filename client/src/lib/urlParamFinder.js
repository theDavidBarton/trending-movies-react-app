export default function urlParamFinder() {
  let value = 'en'
  const url = window.location.pathname
  const paramRegex = new RegExp('/(en|sv){1}')
  if (url.match(paramRegex)) value = url.match(paramRegex)[0].replace(/\//g, '')
  return value
}
