import React, { Component } from 'react'

class Footer extends Component {
  render() {
    return (
      <div className="badge-light" style={{ paddingBottom: '25px', paddingTop: '25px' }}>
        <div className="container">
          <div className="row">
            <img
              className="col"
              alt="TMDb logo"
              src="https://www.themoviedb.org/assets/2/v4/logos/powered-by-rectangle-green-dcada16968ed648d5eb3b36bbcfdd8cdf804f723dcca775c8f2bf4cea025aad6.svg"
            />
            <div className="col">
              <br />
              <p className="lead">
                Today these are the TOP9 trending movies on The Movie Database. All content is provided by the TMDb API.
              </p>
              <p><span className="badge badge-success">#TMDb</span> <span className="badge badge-warning">#trending</span> <span className="badge badge-light">#ReactJS</span> <span className="badge badge-danger">#bootstrap</span></p>
            </div>
            <div className="col">
              <br />
              <p className="lead">Created with <code>create-react-app</code> npm package and Bootstrap 4</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer
