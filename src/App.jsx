import React from 'react';
import ReactDOM from 'react-dom';

import 'src/index.less';

import Form from 'src/components/Form';
import Table from 'src/components/table/Table';

export default class App extends React.Component {
  state = {
    users: [],
  }

  addUser = (newUser) => {
    const { users } = this.state;

    this.setState({ users: users.push(newUser) });
  }

  removeUser = (userId) => {
    console.log(`i ll remove a user with id ${userId}`);
  }

  render() {
    const { users } = this.state;

    return (
      <div className='index'>
        <Form onAddUser={this.addUser} />
        <Table users={users} removeUser={this.removeUser} />
      </div>
    );
  }
}
