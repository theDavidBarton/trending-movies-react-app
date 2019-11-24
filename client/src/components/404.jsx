import React, { Component, Fragment } from 'react'

class Page404 extends Component {
  render() {
    return (
      <Fragment>
        <div className='bg-dark text-warning'>
          <div className='container'>
            <h1 className='row'>404 not found</h1>
            <p className='row'>
              Back to <a href='/'> home</a>.
            </p>{' '}
          </div>
        </div>
      </Fragment>
    )
  }
}
export default Page404
