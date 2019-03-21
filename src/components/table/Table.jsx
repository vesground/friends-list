import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import 'src/components/table/Table.less';

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
import AddIcon from '@material-ui/icons/Add';

import TableHead from 'src/components/table/TableHead';
import { compareInAscendingOrder, compareInDescendingOrder } from 'src/common/utils/utils';

const sortUsersCreator = (sortBy, order) => (a, b) => {
  let sortedUsers;
  if (order === 'asc') {
    sortedUsers = compareInAscendingOrder(a, b, sortBy);
  } else if (order === 'desc') {
    sortedUsers = compareInDescendingOrder(a, b, sortBy);
  }

  return sortedUsers;
};

export default class UsersTable extends React.Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      surname: PropTypes.string,
      age: PropTypes.number,
      phone: PropTypes.string,
    })).isRequired,
    onRemoveUser: PropTypes.func.isRequired,
    onShowForm: PropTypes.func.isRequired,
    isFormOpen: PropTypes.bool.isRequired,
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
    sortBy = colunmName;

    this.setState({ sortBy, order });
  };

  removeUser = user => () => {
    const { onRemoveUser } = this.props;
    onRemoveUser(user);
  }

  render() {
    const { sortBy, order, page, rowsPerPage } = this.state;
    const { users, onShowForm, isFormOpen } = this.props;
    const comparingFunction = sortUsersCreator(sortBy, order);
    const isUsersFound = users && users.length > 0;
    const sortedUsers = isUsersFound && users.sort(comparingFunction);
    const notFoundUsersMessageClassname = isFormOpen ? 'hidden' : '';
    const tableStyles = isFormOpen ? {} : { width: '97vw' };

    return (
      <div>
        <Table style={tableStyles} class='table'>
          <TableHead sortBy={sortBy}
                     order={order}
                     onHandleRequestSort={this.handleRequestSort} />
          <TableBody class='body'>
            {sortedUsers && sortedUsers
              .slice(page * 3, (page + 1) * 3)
              .map((user, index) => (
                <TableRow class='body__row' key={`user-${index}`}>
                  <TableCell class='body__cell'>{user.name}</TableCell>
                  <TableCell class='body__cell'>{user.surname}</TableCell>
                  <TableCell class='body__cell'>{user.age}</TableCell>
                  <TableCell class='body__cell'>{user.phone}</TableCell>
                  <IconButton className='body__row__deleteButton' aria-label='Delete' onClick={this.removeUser(user)}>
                    <DeleteIcon />
                  </IconButton>
                  {!isFormOpen
                    ? (
                      <IconButton className='body__row__addUserButton' aria-label='Show' onClick={onShowForm}>
                        <AddIcon />
                      </IconButton>
                    )
                    : null
                  }
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
        {isUsersFound
          ? <TablePagination rowsPerPageOptions={[rowsPerPage]}
                             component='div'
                             count={sortedUsers.length}
                             rowsPerPage={rowsPerPage}
                             page={page}
                             backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                             nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                             onChangePage={this.handleChangePage} />
          : (
            <div className='notFoundUsersMessage'>
              There are no friends in your list. Be more sociable!
              <span className={notFoundUsersMessageClassname}>Click
                <span className='notFoundUsersMessage__link' onClick={onShowForm}>here</span> to add a new one.
              </span>
            </div>
          )
        }
      </div>
    );
  }
}
