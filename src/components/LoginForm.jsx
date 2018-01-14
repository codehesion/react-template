import React, { Component } from 'react';

class LoginForm extends Component {   

  render() {
    return (
      <form action="/" onSubmit={ this.props.onSubmit }>
        {this.props.successMessage && <div className="alert alert-success">{ this.props.successMessage }</div>}
        {this.props.errors.summary && <div className="alert alert-danger">{ this.props.errors.summary }</div>}      
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" className="form-control" onChange={ this.props.onChange } value={ this.props.user.username } />
          {this.props.errors.username && <small className="text-danger">{this.props.errors.username}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" className="form-control" onChange={ this.props.onChange } value={ this.props.user.password }  />
          {this.props.errors.password && <small className="text-danger">{this.props.errors.password}</small>}
        </div>
        <div className="form-group text-center">
          <button type="submit" className="btn btn-primary mt-3">
            Login
          </button>
        </div>
      </form>      
    );
  }

}

export default LoginForm;
