import React, { Component } from 'react';

class UserEditForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: this.props.user.username,
			name: this.props.user.name,
			email: this.props.user.email,
			imageUrl: this.props.user.imageUrl
		};
		this.setUsername = this.setUsername.bind(this);
		this.setName = this.setName.bind(this);
		this.setEmail = this.setEmail.bind(this);
		this.setImageUrl = this.setImageUrl.bind(this);
		this.formSubmit = this.formSubmit.bind(this);
	}

	setUsername(e) {
		this.setState({ username: e.target.value });
	}

	setName(e) {
		this.setState({ name: e.target.value });
	}

	setEmail(e) {
		this.setState({ email: e.target.value });
	}

	setImageUrl(e) {
		this.setState({ imageUrl: e.target.value });
	}

	formSubmit(e) {
		e.preventDefault();
		let updatedUser = this.props.user;
		updatedUser['username'] = this.state.username;
		updatedUser['name'] = this.state.name;
		updatedUser['email'] = this.state.email;
		updatedUser['imageUrl'] = this.state.imageUrl;
		this.props.onUserUpdate(updatedUser);
	}

	render() {
		return (
			<form onSubmit={ this.formSubmit }>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input 
          	type="text" 
          	name="username" 
          	className="form-control" 
          	defaultValue={ this.props.user.username } 
          	onChange={ this.setUsername }
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input 
          	type="text" 
          	name="name" 
          	className="form-control" 
          	defaultValue={ this.props.user.name } 
          	onChange={ this.setName }
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
          	type="text" 
          	name="email" 
          	className="form-control" 
          	defaultValue={ this.props.user.email } 
          	onChange={ this.setEmail }
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input 
          	type="text" 
          	name="imageUrl" 
          	className="form-control" 
          	defaultValue={ this.props.user.imageUrl } 
          	onChange={ this.setImageUrl }
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Submit</button>
			</form>
		)
	}

}

export default UserEditForm;