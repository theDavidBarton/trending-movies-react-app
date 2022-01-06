[![Actions Status](https://github.com/theDavidBarton/trending-movies-react-app/workflows/CI/badge.svg)](https://github.com/theDavidBarton/trending-movies-react-app/actions)
![imdb](https://img.shields.io/badge/IMDb-false-1C1E20.svg?logo=imdb)
![tmdb](https://img.shields.io/badge/TMDb-true-01D277.svg?logo=the-movie-database)
![crocodile](https://img.shields.io/badge/crocodiles_in_the_basement-%F0%9F%90%8A_yes-orange.svg)

# Trending Movies

## Reusing this project without forking

⚠️ As I see more-and-more are using my application as an inspiration for their projects which is cool. 😊 **I want to ask you** to make sure that you comply with the [MIT](#license) license in case you are copy-pasting parts of it (means you are not forking, so the natural connection is cut between your work and the original source code) ☝️ (+ if you'd give me credits as my project was an "inspiration" for yours that would be much appreciated) Thank you! 🙏

## About

A movie database project made in React.Js, Node.Js, Express and deployed on Heroku.

The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This product uses the TMDb API but is not endorsed or certified by TMDb.

![TMDb app](screenshot_page.jpg)

## API key

The API key is stored in the TMDB_API_KEY environment variable (app.env file is gitignored). If you try to serve / build your own instance make sure the environment variable is accessible. (server.js will notify you if API key is accessible or not). You can get a free API key at TMDb.org: [https://developers.themoviedb.org/3/getting-started/introduction](https://developers.themoviedb.org/3/getting-started/introduction)

## Available Scripts

In the project directory, you can run:

### `yarn start` (backend)

Runs the app in the development mode (by default on port 5000).<br>
Open e.g. [http://localhost:5000/api/trending](http://localhost:5000/api/trending) to view API response in the browser.

### `cd client && yarn start` (frontend)

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `cd client && yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `cd client && yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `cd client && yarn run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `git push heroku master`

Deploy to environment.

## License

MIT License

Copyright (c) 2019-present David Barton

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
