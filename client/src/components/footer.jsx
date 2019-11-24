import React, { Component } from 'react'
import logoDark from './../img/logo-big-dark.png'

class Footer extends Component {
  render() {
    return (
      <div className='bg-light' style={{ paddingBottom: '25px', paddingTop: '25px' }}>
        <div className='container'>
          <div className='row'>
            <img className='col' alt='logo' src={logoDark} />
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
            <div className='col'>
              <br />
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
