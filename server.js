const express = require('express')
const request = require('request')
const path = require('path')
const tmdbApiKey = process.env.TMDB_API_KEY

const optionsTrending = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/trending/movie/day',
  qs: {
    api_key: tmdbApiKey
  }
}

let optionsMovieDetails = {
  method: 'GET',
  url: null,
  qs: {
    api_key: tmdbApiKey,
    append_to_response: 'videos,credits'
  }
}
let parsedResult

if (tmdbApiKey === undefined)
  console.log('TMDb api key is NOT found among environment variables!')
else console.log('TMDb api key is found')

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

    // providing a constant endpoint for trending movies
    app.use(express.static(path.join(__dirname, 'client/build')))
    app.get('/api/trending', async (req, res) => {
      res.json(await apiCall(optionsTrending))
      console.log('/api/trending endpoint has been called!')
    })

    // providing a dynamic endpoint to movie pages
    app.get('/api/movieDetails/:tmdbId', async (req, res) => {
      let id = req.params.tmdbId
      optionsMovieDetails.url = `https://api.themoviedb.org/3/movie/${id}`
      res.json(await apiCall(optionsMovieDetails))
      console.log(`/api/movieDetails/${id} endpoint has been called!`)
    })

    app.listen(port)

    console.log(`API is listening on ${port}`)
  } catch (e) {
    console.error(e)
  }
}
endpointCreation()
