import React from 'react';
import ReactDOM from 'react-dom';

import 'src/index.less';

import AddIcon from '@material-ui/icons/Add';

import Form from 'src/components/Form';
import Table from 'src/components/table/Table';

const createUser = (name, surname, age, phone) => ({ name, surname, age, phone });

export default class App extends React.Component {
  state = {
    users: [
      createUser('Barack', 'Obama', 57, '211-394-46-98'),
      createUser('Naruto', 'Uzumaki', 22, '095-071-78-79'),
      createUser('Kanye', 'West', 41, '011-054-62-85'),
      createUser('Ilon', 'Mask', 47, '847-453-09-58'),
    ],
    isFormOpen: true,
  }

  addUser = (newUser) => {
    const { users } = this.state;

    this.setState({ users: [ ...users, newUser] });
  }

  removeUser = (user) => {
    this.setState((prevState, props) => {
      const userIndex = prevState.users.indexOf(user);

      return {
        users: prevState.users.filter((user, index) => index !== userIndex),
    }})
  }

  hideForm = () => {
    const { isFormOpen } = this.state;

    if (isFormOpen) {
      this.setState({ isFormOpen: false });
    }
  }

  showForm = () => {
    const { isFormOpen } = this.state;

    if (!isFormOpen) {
      this.setState({ isFormOpen: true });
    }
  }

  render() {
    const { users, isFormOpen } = this.state;

    return (
      <div className='App'>
          <Form onAddUser={this.addUser} onHideForm={this.hideForm} isFormOpen={isFormOpen} />
          <Table users={users}
                 onRemoveUser={this.removeUser}
                 isFormOpen={isFormOpen}
                 onShowForm={this.showForm} />
      </div>
    );
  }
}
