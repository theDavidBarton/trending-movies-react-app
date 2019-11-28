import React, { Component } from 'react'
import SearchForm from './searchForm'
import logo from './../img/logo-big.svg'
import github from './../img/github.svg'
import linkedin from './../img/linkedin.png'

class Header extends Component {
  state = {
    bgImageIndex: 2,
    searchForm: true
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
        className='bg-dark pb-3'
        style={{
          backgroundImage: imagePlacement,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}>
        <div className='container text-white'>
          <div className='row justify-content-md-center'>
            <div className='col'>
              <a href='/'>
                <img
                  className='img-fluid text-center'
                  src={logo}
                  alt='logo'
                  style={{ height: '100%', width: '350px' }}
                />
              </a>
            </div>
            <div className='col-auto align-self-end order-1 order-md-0'>
              {this.state.searchForm ? <SearchForm /> : null}
              <h1>trending on TMDb</h1>
            </div>
            <div className='col-auto align-self-end my-2'>
              <ul className='list-unstyled align-bottom' style={{ marginRight: '2em' }}>
                <li className='my-2'>
                  <a
                    href='https://github.com/theDavidBarton'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='btn btn-light'
                    style={{ display: 'inline-block' }}>
                    <img
                      className='float-left'
                      alt='github logo'
                      src={github}
                      style={{ marginRight: '0.5em', height: '22px' }}
                    />
                    GitHub
                  </a>
                </li>
                <li className='my-2'>
                  <a
                    href='https://linkedin.com/in/theDavidBarton/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='btn btn-light float-left'
                    style={{ display: 'inline-block' }}>
                    <img
                      className='float-left'
                      alt='linkedin logo'
                      src={linkedin}
                      style={{ marginRight: '0.5em', height: '22px' }}
                    />
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
