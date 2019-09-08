const express = require('express')
const request = require('request')

const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/trending/movie/day',
  qs: {
    api_key: process.env.TMDB_API_KEY
  },
  body: '{}'
}
let parsedResult
console.log(process.env.TMDB_API_KEY)

async function apiCall(options) {
  // (I.) promise to return the parsedResult for processing
  function tmdbRequest() {
    return new Promise(function(resolve, reject) {
      request(options, function(error, response, body) {
        try {
          resolve(JSON.parse(body))
        } catch (e) {
          reject(e)
        }
      })
    })
  }

  // (II.)
  try {
    parsedResult = await tmdbRequest()
  } catch (e) {
    console.error(e)
  }
  return parsedResult
}

function endpointCreation() {
  try {
    const app = express()
    const port = process.env.PORT || 5000

    app.get('/api/trending', async (req, res) => {
      res.json(await apiCall(options))
      console.log('endpoint is ready!')
    })

    app.listen(port)

    console.log(`API is listening on ${port}`)
  } catch (e) {
    console.error(e)
  }
}
endpointCreation()
