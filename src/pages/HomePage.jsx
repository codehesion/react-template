import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomePage extends Component {

  render() {
    return (
      <div>

        <div className="row">
          <div className="col-12">

            <div className="card mt-3 border-dark text-center">
              <div className="card-header bg-xdark text-light">
                <h4 className="card-title mb-0">Codehesion React Template</h4>
              </div>
              <div className="card-body">  
                <h5 className="card-subtitle text-muted mb-0">
                  Web Design &amp; Development<br/>Oakland, California
                </h5>
              </div> 
            </div>
          </div>
        </div>
      </div>     
    )
  }
}

export default HomePage;