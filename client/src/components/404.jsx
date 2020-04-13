import React, { Fragment } from 'react'

export default function Page404() {
  return (
    <Fragment>
      <div className='bg-dark text-warning'>
        <div className='container text-center'>
          <div className='row'>
            <h1 className='col display-2 py-5'>404 not found</h1>
          </div>
        </div>
      </div>
      <div className='bg-white container text-center'>
        <p className='col display-4'>
          Back to{' '}
          <a className='text-secondary' href='/'>
            {' '}
            home
          </a>
          .
        </p>{' '}
      </div>
    </Fragment>
  )
}
