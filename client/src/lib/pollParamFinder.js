export default function pollParamFinder() {
  let value
  const paramMatch = window.location.search.match(/(?<=poll=)(\d+)((?=&)|(?=$))/)
  paramMatch ? (value = paramMatch[0]) : null
  return value
}
