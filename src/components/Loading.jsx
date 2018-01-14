import React, { Component } from 'react';

class Loading extends Component {

  render() {
    return (
      <div className="card border-dark mt-3 text-center text-md-left">
        <div className="card-header bg-xdark text-light">
          <h4 className="card-title mb-0">Loading...</h4>
        </div>
      </div>
    )
  }
}

export default Loading;
