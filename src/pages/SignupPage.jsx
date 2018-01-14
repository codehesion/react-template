import React, { Component } from 'react';
import SignupForm from '../components/SignupForm';
import { Redirect, Link } from 'react-router-dom';

class SignupPage extends Component {   

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      errors: {},
      user: {
        username: '',
        password: '',
        name: ''
      }
    };
    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  processForm(e) {
    e.preventDefault();
    const name = encodeURIComponent(this.state.user.name);
    const username = encodeURIComponent(this.state.user.username);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `name=${name}&username=${username}&password=${password}`;
    const xhr = new XMLHttpRequest();
    xhr.open('post', 'https://auth.codehesion.tech/signup');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if(xhr.status === 200){
        localStorage.setItem('successMessage', xhr.response.message);
        this.setState({
          errors: {},
          redirect: true
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
    if(this.state.redirect){ return( <Redirect to="/login" /> ) }
    return (
      <div className="row">
        <div className="col-12 col-md-6 ml-md-auto mr-md-auto">
          <div className="card border-dark mt-3">
            <div className="card-header bg-xdark text-light">
              <h3 className="card-title mb-0 text-center">Sign Up</h3>
            </div>
            <div className="card-body text-center">
              <SignupForm 
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={this.state.errors}
                user={this.state.user}                  
              />
              <p className="card-text">
                Already have an account?&nbsp;
                <Link to="/login">Login</Link>
              </p>                 
            </div>
          </div>
        </div>  
      </div>  
    );
  }

}

export default SignupPage;
