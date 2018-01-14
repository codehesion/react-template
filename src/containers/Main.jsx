import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import UsersPage from '../pages/UsersPage';

class Main extends Component {

  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={HomePage}/>        
          <Route exact path='/users' render={() => {
              return( 
                <UsersPage 
                	currentUser={ this.props.currentUser }
                /> 
              )
            }
          }/>
          <Route exact path='/login' render={() => {
              return( 
                <LoginPage 
                	onUserLogin={this.props.onLogin}
                /> 
              )
            }
          }/>
          <Route exact path='/signup' component={SignupPage}/>
        </Switch>
      </main>
    );
  }
}

export default Main;