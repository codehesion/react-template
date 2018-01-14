import React, { Component } from 'react';
import Auth from '../modules/Auth';
import UsersList from '../components/UsersList';
import UserCard from '../components/UserCard';
import Loading from '../components/Loading';
import axios from 'axios';


class UsersPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      users: [],
      activeUser: {}
    };
    this.getUsers = this.getUsers.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);
  }

  getUsers() {
    let config = {
        'headers': {
          'authorization': `Bearer ${Auth.getToken()}`,
        }
    };
    //console.log(config);
    axios.get('https://auth.codehesion.tech/users', config)
    .then(res => {
      this.setState({
        users: res.data.users
      });
    });
  }

  setActiveUser(activeUser){
    this.setState({
      activeUser
    });
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    return (
          <div>
            { (this.state.users.length > 0) ? 
              (
                <div>
                  <div className="card border-dark mt-3 text-center text-md-left">
                    <div className="card-header bg-xdark text-light">
                      <h4 className="card-title mb-0">Users</h4>
                    </div>
                    <UsersList
                      users={ this.state.users }
                      activeUser={ this.state.activeUser }
                      setActiveUser={ this.setActiveUser }
                    />
                  </div>
                </div>   
              ) : <Loading />
            }    
            { (Object.keys(this.state.activeUser).length > 0) ? 
              (
                <UserCard
                  currentUser={this.props.currentUser}
                  user={this.state.activeUser}
                /> 
              ) : null
            }
          </div>

    )
  }
}

export default UsersPage;