import React, { Component } from 'react';
import Auth from '../modules/Auth';
import UserEditForm from './UserEditForm';
import axios from 'axios';
import moment from 'moment';

class UserCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profileVisible: true,
      editFormVisible: false,
    };
    this.toggleForm = this.toggleForm.bind(this);
    this.handleUserUpdate = this.handleUserUpdate.bind(this);
  }

  toggleForm() {
    this.setState({
      profileVisible: !this.state.profileVisible,
      editFormVisible: !this.state.editFormVisible
    });
  }

  handleUserUpdate(newUser) {
    let config = {
      'headers': {
        'authorization': `Bearer ${Auth.getToken()}`,
      },
      'json': true
    };
    axios.post(`https://auth.codehesion.tech/users/${newUser._id}/edit`, newUser, config)
    .then(res => {
      //console.log(res.data)
      //this.getAllCourses()
      this.toggleForm()
    })
    .catch(error => {
      //console.error(error);
      //this.setState({ courses: courses });
      this.toggleForm()
    });    
  }

  render() {
    let isOwner = String(this.props.currentUser._id) === String(this.props.user._id) ? true : false;
    let cardTitle = isOwner && this.state.editFormVisible ? `Edit ${this.props.user.username}` : `${this.props.user.username}`;
    let profileVisible = this.state.profileVisible ? true : false;
    let editFormVisible = this.state.editFormVisible ? true : false;
    return (
      <div className="card border-dark mt-3 text-center text-md-left">
        <div className="card-header bg-xdark text-light">
          <h4 className="card-title mb-0 text-capitalize">{ cardTitle }</h4>
        </div>
        <div className="card-body">  
          { isOwner && editFormVisible ? (
            <UserEditForm 
              currentUser={ this.props.currentUser }
              user={ this.props.user }
              onUserUpdate={ this.handleUserUpdate }
            />
          ) : ( 
            <div>
              <CreatedTimeAgo createdAt={this.props.user.createdAt} />
              { this.props.user.imageUrl && (
                <img src={ this.props.user.imageUrl } className="img-fluid mb-2" alt={ `${this.props.user.username}`} />
              )}
              { this.props.user.name && (
                <h3 className="card-title">{ this.props.user.name }</h3>
              )}
              { this.props.user.email && (
                <h5 className="card-title">
                  <a target="_blank" rel="noopener noreferrer" href={ `mailto: ${this.props.user.email}` }>
                    { this.props.user.email }
                  </a>
                </h5>
              )}
            </div> 
          )}   
        </div>
        
          { isOwner ? (
            <ul className="list-group list-group-flush">
              { profileVisible ? (
                <button 
                  className="list-group-item list-group-item-action bg-primary text-light"
                  onClick={this.toggleForm}
                >Edit</button>
              ) : (
                <button 
                  className="list-group-item list-group-item-action bg-secondary text-light"
                  onClick={this.toggleForm}
                >Cancel</button>
              )}
            </ul>
          ) : null }
        
      </div> 
    )
  }
}

export default UserCard;

function CreatedTimeAgo(props) {
  let createdAtDate = new Date(props.createdAt);
  let createdAtMoment = moment(createdAtDate).fromNow();
  return (
    <h5 className="card-subtitle text-muted mb-3">{ `joined ${createdAtMoment}` }</h5>
  );
}