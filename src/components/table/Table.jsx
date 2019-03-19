import React from 'react';
import PropTypes from 'prop-types';

import 'src/components/table/Table.less'

import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Checkbox,
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import TableHead from 'src/components/table/TableHead';

const sortUsersCreator = (sortBy, order) => (a, b) => {
  if (order === 'asc') {
    return compareInAscendingOrder(a, b, sortBy);
  } else {
    return compareInDescendingOrder(a, b, sortBy);
  }
}

const compareInAscendingOrder = (a, b, colunmName) => {
  if (a[colunmName] > b[colunmName]) {
    return 1;
  }
  if (a[colunmName] < b[colunmName]) {
    return -1;
  }
  return 0;
}

const compareInDescendingOrder = (a, b, colunmName) => {
  if (a[colunmName] < b[colunmName]) {
    return 1;
  }
  if (a[colunmName] > b[colunmName]) {
    return -1;
  }
  return 0;
}

export default class UsersTable extends React.Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
    onRemoveUser: PropTypes.func.isRequired,
    onShowForm: PropTypes.func.isRequired,
  }

  state = {
    sortBy: '', // by name || surname || age || phone
    order: 'desc', // asc || desc
    page: 0,
    rowsPerPage: 3,
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleRequestSort = (event, colunmName) => {
    let { sortBy, order } = this.state;

    if (sortBy === colunmName) {
      order = order === 'asc' ? 'desc' : 'asc';
    }

    this.setState((prevState, props) => ({
        sortBy: colunmName,
        order,
    }));
  };

  removeUser = (user) => () => {
    this.props.onRemoveUser(user);
  }

  render() {
    const { sortBy, order, page, rowsPerPage } = this.state;
    const { users, onShowForm, isFormOpen } = this.props;
    const comparingFunction = sortUsersCreator(sortBy, order);
    const isUsersFound = users && users.length > 0;
    const sortedUsers = isUsersFound && this.props.users.sort(comparingFunction);
    const fontSize = { fontSize: '1rem' };
    const tableStyles = isFormOpen ? { width: '70vw'} : { width: '97vw'};
    const notFoundUsersMessageHide = isFormOpen ? 'notFoundUsersMessage__hide' : '';

    return (
      <div>
        <Table style={tableStyles} className='table'>
          <TableHead sortBy={sortBy}
                     order={order}
                     onHandleRequestSort ={this.handleRequestSort} />
          <TableBody className='body'>
            {sortedUsers && sortedUsers
              .slice(page * 3, (page + 1) * 3)
              .map((user, index) => {
                return (
                  <TableRow className='body__row' key={`user-${index}`}>
                    <TableCell style={fontSize}>{user.name}</TableCell>
                    <TableCell style={fontSize}>{user.surname}</TableCell>
                    <TableCell style={fontSize}>{user.age}</TableCell>
                    <TableCell style={fontSize}>{user.phone}</TableCell>
                    <IconButton className='body__row__delete' aria-label="Delete" onClick={this.removeUser(user)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableRow>
              )})
            }
          </TableBody>
        </Table>
        {isUsersFound
          ? <TablePagination rowsPerPageOptions={[rowsPerPage]}
                            component="div"
                            count={sortedUsers.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                            nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            onChangePage={this.handleChangePage} />
          : <div className='notFoundUsersMessage'>
              There are no friends in your list. Be more sociable!
              <span className={notFoundUsersMessageHide}>Click <span className='notFoundUsersMessage__link' onClick={onShowForm}>here</span> to add a new one.</span>
            </div>
        }
      </div>
    );
  }
}
