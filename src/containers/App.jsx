import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import UserCard from '../components/UserCard';
import Main from './Main';
import Footer from '../components/Footer';
import Auth from '../modules/Auth';
import axios from 'axios';
import moment from 'moment';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      currentUser: {}
    };
    this.loginCurrentUser = this.loginCurrentUser.bind(this);
    this.logoutCurrentUser = this.logoutCurrentUser.bind(this);
  }

  loginCurrentUser() {
    let config = {
        'headers': {
          'authorization': `Bearer ${Auth.getToken()}`,
        }
    };
    //console.log(config);
    axios.get('https://auth.codehesion.tech/api/dashboard', config)
    .then(res => {
      let createdDate = new Date(res.data.user.createdAt);
      res.data.user['createdFromNow'] = moment(createdDate).fromNow();
      this.setState({
        isLoggedIn: true,
        currentUser: res.data.user
      });
    });
  }

  logoutCurrentUser() {
    this.setState({
      isLoggedIn: false,
      currentUser: {}
    });
  }

  componentDidMount() {
    if(Auth.isUserAuthenticated()){
      this.loginCurrentUser()
    } 
  }

  render() {
    let mainColClassNames = this.state.isLoggedIn ? "col-12 col-md-8 col-lg-9 order-1 order-md-2" : "col-12"; 
    return (
      <div>
        <div className="viewport-container">
          <NavBar
            appTitle="Codehesion"
            isLoggedIn={ this.state.isLoggedIn }
            currentUser={ this.state.currentUser }
            onUserLogout={ this.logoutCurrentUser }
          />

          <div className="container-fluid">
            <div className="row">
              { this.state.isLoggedIn ? (
                <div className="col-12 col-md-4 col-lg-3 order-2 order-md-1">
                  <UserCard
                    currentUser={this.state.currentUser}
                    user={this.state.currentUser}
                  />               
                </div>
              ) : null }  
              <div className={mainColClassNames}>
                <Main 
                  isLoggedIn={ this.state.isLoggedIn }
                  currentUser={ this.state.currentUser }
                  onLogin={ this.loginCurrentUser }
                />
              </div>
            </div>
          </div>
    
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
