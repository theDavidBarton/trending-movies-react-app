import React, { Component, Fragment } from 'react'
import dompurify from 'dompurify'
import labels from './../i18n.json'

class CookieBar extends Component {
  state = {
    isOpened: true,
    labels: labels.cookieBar
  }

  closeIt = () => {
    this.setState({ isOpened: false })
  }

  render() {
    return (
      <Fragment>
        {this.state.isOpened ? (
          <div className='bg-warning sticky-top py-2'>
            <div className='container'>
              <span
                dangerouslySetInnerHTML={{
                  __html: dompurify.sanitize(this.state.labels.text[this.props.lang])
                }}></span>
              <button onClick={this.closeIt} type='button' className='close' aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
          </div>
        ) : null}
      </Fragment>
    )
  }
}

export default CookieBar
