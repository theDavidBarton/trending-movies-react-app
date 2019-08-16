import React, { Component } from 'react'

class CookieBar extends Component {
  state = {
    isOpened: true
  }

  closeIt = () => {
    this.setState({ isOpened: false })
  }

  render() {
    return (
      <React.Fragment>
        { this.state.isOpened ?
          <div className="badge-warning sticky-top" style={{ paddingBottom: '10px', paddingTop: '10px' }}>
            <div className="container">
        This page doesn't store cookies, but TMDb does. Check out <a className="text-success" href="https://www.themoviedb.org/privacy-policy">their cookie policy</a> to opt out!
              <button onClick={this.closeIt} type="button" className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
          :null }
      </React.Fragment>
    )
  }
}

export default CookieBar
