import React, { Component } from 'react'

class Header extends Component {
  state = {
    bgImageIndex: 2
  }

  getBackground = () => {
    const background = this.props.data.results[this.state.bgImageIndex].backdrop_path
    return background
  }

  render() {
    let imagePlacement = this.props.dataIsReady
      ? 'linear-gradient(0deg, rgba(52,58,64,1) 0%, rgba(52,58,64,0) 100%), url(https://image.tmdb.org/t/p/w1280' +
        this.getBackground() +
        ')'
      : 'url(data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==)'

    return (
      <div
        className='bg-dark'
        style={{
          paddingBottom: '25px',
          paddingTop: '25px',
          backgroundImage: imagePlacement,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}>
        <div className='container text-white'>
          <div className='row'>
            <a href='/'>
              <img
                className='col'
                alt='TMDb logo'
                src='https://www.themoviedb.org/assets/2/v4/logos/powered-by-rectangle-green-dcada16968ed648d5eb3b36bbcfdd8cdf804f723dcca775c8f2bf4cea025aad6.svg'
              />
            </a>
            <h1 className='display-3 col' style={{ textShadow: '2px 2px 4px #343a40' }}>
              Trending movies
            </h1>
            <div className='col'>
              <br />
              <p className='lead'>
                Today these are the TOP9 trending movies on The Movie Database. This product uses the TMDb API but is
                not endorsed or certified by TMDb.
              </p>
              <p>
                <span className='badge badge-success'>#TMDb</span>{' '}
                <span className='badge badge-warning'>#trending</span>{' '}
                <span className='badge badge-light'>#ReactJS</span>{' '}
                <span className='badge badge-danger'>#bootstrap</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
