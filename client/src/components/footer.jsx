import React, { Component } from 'react'
import logoDark from './../img/logo-big-dark.svg'

class Footer extends Component {
  render() {
    return (
      <div className='bg-light'>
        <div className='container py-5'>
          <div className='row'>
            <img className='col' alt='logo' src={logoDark} style={{ height: '100%', width: '350px' }} />
            <div className='col align-self-end'>
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
            <div className='col align-self-end'>
              <p className='lead'>
                Created with <code>create-react-app</code> npm package and Bootstrap 4
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer
