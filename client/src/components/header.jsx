import React, { Component } from 'react'
import logo from './../img/logo-big.png'

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
          <div className='row d-flex flex-wrap align-items-center'>
            <a className='col text-center' href='/'>
              <img src={logo} alt='logo' />
            </a>
            <div className='col d-none d-sm-block'>
              <img
                className='position-absolute'
                alt='TMDb logo'
                src='https://www.themoviedb.org/assets/2/v4/logos/powered-by-square-green-11c0c7f8e03c4f44aa54d5e91d9531aa9860a9161c49f5fa741b730c5b21a1f2.svg'
                style={{ width: '130px', left: '-50px', top: '-40px' }}
              />
            </div>
            <div className='col align-bottom'>
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
