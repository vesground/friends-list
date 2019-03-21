import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import 'src/index.less';

import AddIcon from '@material-ui/icons/Add';

import Form from 'src/components/Form';
import Table from 'src/components/table/Table';
import withLocalStorage from 'src/common/utils/withLocalStorage';

const createUser = (name, surname, age, phone) => ({ name, surname, age, phone });

class App extends React.Component {
  static propTypes = {
    setInLocalStorage: PropTypes.func.isRequired,
    getFromLocalStorage: PropTypes.func.isRequired,
  }

  state = {
    users: [],
    isFormOpen: false,
  }

  componentWillUnmount() {
    const { setInLocalStorage } = this.props;

    window.removeEventListener('beforeunload', (event) => setInLocalStorage('users', this.state.users));
  }

  addUser = (newUser) => {
    const { users } = this.state;

    this.setState({ users: [...users, newUser] });
  }

  removeUser = (user) => {
    this.setState((prevState, props) => {
      const userIndex = prevState.users.indexOf(user);

      return { users: prevState.users.filter((currentUser, index) => index !== userIndex) };
    });
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

  componentDidMount() {
    const { setInLocalStorage, getFromLocalStorage } = this.props;
    window.addEventListener('beforeunload', (event) => setInLocalStorage('users', this.state.users));

    const users = getFromLocalStorage('users');
    const isUsersInLocalStorage = !!users;

    this.setState({ users: isUsersInLocalStorage ? users : [] });
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

export default withLocalStorage(App);
