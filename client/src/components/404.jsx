import React, { Component, Fragment } from 'react'
import logoDark from './../img/logo-big-dark.png'

class Page404 extends Component {
  render() {
    return (
      <Fragment>
        <div className='bg-dark text-warning'>
          <div className='container'>
            <div className='row'>
              <h1 className='col'>404 not found</h1>
            </div>
          </div>
        </div>
        <div className='bg-white container'>
          <img className='row text-center' alt='logo' src={logoDark} />
          <p className='col'>
            Back to <a href='/'> home</a>.
          </p>{' '}
        </div>
      </Fragment>
    )
  }
}
export default Page404
