import React, { Component } from 'react';
import Auth from '../modules/Auth';
import LoginForm from '../components/LoginForm';
import { Redirect, Link } from 'react-router-dom';

// let RootDomain = '';
// if(!process.env.JWT_SECRET){
//   RootDomain = 'http://localhost:3001'
// }

class LoginPage extends Component {   

  constructor(props) {
    super(props);
    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';
    if(storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }
    this.state = {
      redirect: false,
      errors: {},
      successMessage,
      user: {
        username: '',
        password: ''
      }
    };
    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  processForm(e) {
    e.preventDefault();

    const username = encodeURIComponent(this.state.user.username);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `username=${username}&password=${password}`;

    const xhr = new XMLHttpRequest();
    xhr.open('post', `https://auth.codehesion.tech/login`);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        Auth.authenticateUser(xhr.response.token);       
        this.props.onUserLogin();
        this.setState({
          redirect: true,
          errors: {}
        });
      } else {
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;
        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);    
  }

  changeUser(e) {
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value;

    this.setState({
      user
    });
  }

  render() {
    if(this.state.redirect){ return( <Redirect to="/" /> ) }
    return (
      <div className="row">
        <div className="col-12 col-md-6 ml-md-auto mr-md-auto">      
          <div className="card border-dark mt-3">
            <div className="card-header bg-xdark text-light">
              <h3 className="card-title mb-0 text-center">Login</h3>
            </div>
            <div className="card-body">
              <LoginForm 
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={this.state.errors}
                successMessage={this.state.successMessage}
                user={this.state.user}
              />
              <p className="card-text">
                Need an account?&nbsp;
                <Link to="/signup">Sign Up</Link>
              </p>  
            </div>
          </div>
        </div>
      </div>               
    );
  }

}

export default LoginPage;
