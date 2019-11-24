import React, { Component } from 'react'
import logo from './../img/logo-big.png'
import poweredBy from './../img/poweredby-tmdb.png'

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
              <img className='col align-middle text-center' src={logo} alt='logo' />
            </a>
            <div className='col d-flex align-items-end'>
              <img
                className='d-flex align-items-end text-center'
                alt='TMDb logo'
                src='https://www.themoviedb.org/assets/2/v4/logos/293x302-powered-by-square-green-3ee4814bb59d8260d51efdd7c124383540fc04ca27d23eaea3a8c87bfa0f388d.png'
              />
            </div>
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
