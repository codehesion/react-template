import React, { Component } from 'react';
import shortid from 'shortid';

class UsersList extends Component {

  constructor(props) {
    super(props);
    this.selectUser = this.selectUser.bind(this);
  }

  selectUser(e) {
    let activeUserIndex = e.target.getAttribute('arrayindex');
    let activeUser = this.props.users[activeUserIndex];
    this.props.setActiveUser(activeUser);
  }



  render() {
    let users = this.props.users.map((user, arrayIndex) => {
      return (
        <UsersListItem
          user={ user }
          activeUser={ this.props.activeUser }
          key={ shortid.generate() }
          selectUser={ this.selectUser }
          arrayIndex={ arrayIndex }
        />
      )
    });
    return (
      <ul className="list-group list-group-flush">
        {users}
      </ul>
    )
  }
}

export default UsersList;

function UsersListItem(props) {
  let classNames = "list-group-item list-group-item-action";
  if(JSON.stringify(props.user) === JSON.stringify(props.activeUser)){
    classNames = `${classNames} active`;
  }
  return (
    <button 
      className={ classNames } 
      arrayindex={props.arrayIndex}
      onClick={ props.selectUser }
    >{props.user.username}</button>
  )
}