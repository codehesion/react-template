import React, { Component } from 'react';
import UserCard from '../components/UserCard';
import Loading from '../components/Loading';


class UserProfilePage extends Component {

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-4">
          { (Object.keys(this.props.currentUser).length > 0) ? 
            (
              <UserCard
                currentUser={this.props.currentUser}
                user={this.props.currentUser}
              />   
            ) : <Loading />
          }    
          </div>
        </div>    
      </div>
    )
  }
}

export default UserProfilePage;