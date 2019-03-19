import React from 'react';
import PropTypes from 'prop-types';

import 'src/components/table/Table.less'

import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
} from '@material-ui/core';

import TableHead from 'src/components/table/TableHead';

const createUser = (name, surname, age, phone) => ({ name, surname, age, phone });
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
    removeUser: PropTypes.func.isRequired,
  }

  state = {
    sortBy: '', // by name || surname || age || phone
    order: 'desc', // asc || desc
    sortedUsers: [
      createUser('Barack', 'Obama', 57, '211-394-46-98'),
      createUser('Naruto', 'Uzumaki', 22, '095-071-78-79'),
      createUser('Kanye', 'West', 41, '011-054-62-85'),
      createUser('Ilon', 'Mask', 47, '847-453-09-58'),
    ],
    page: 1,
    rowsPerPage: 3
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleRequestSort = (event, colunmName) => {
    let { sortBy, order } = this.state;

    if (sortBy === colunmName) {
      order = order === 'asc' ? 'desc' : 'asc';
    }

    this.setState((prevState, props) => {
      const comparingFunction = sortUsersCreator(colunmName, order);

      return {
        sortedUsers: prevState.sortedUsers.sort(comparingFunction),
        sortBy: colunmName,
        order,
      };
    });
  };

  render() {
    const { sortedUsers, page, rowsPerPage, sortBy, order } = this.state;
    const fontSize = { fontSize: '1rem' };

    return (
      <div>
        <Table className='table'>
          <TableHead sortBy={sortBy}
                     order={order}
                     onHandleRequestSort ={this.handleRequestSort} />
          <TableBody className='body'>
            {sortedUsers
              .slice(page * 3, (page + 1) * 3)
              .map((user, index) => {
              return (
              <TableRow className='body__row' key={`user-${index}`}>
                <TableCell style={fontSize}>{user.name}</TableCell>
                <TableCell style={fontSize}>{user.surname}</TableCell>
                <TableCell style={fontSize}>{user.age}</TableCell>
                <TableCell style={fontSize}>{user.phone}</TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
        <TablePagination rowsPerPageOptions={[rowsPerPage]}
                         component="div"
                         count={sortedUsers.length}
                         rowsPerPage={rowsPerPage}
                         page={page}
                         backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                         nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                         onChangeRowsPerPage={this.handleChangeRowsPerPage}
                         onChangePage={this.handleChangePage} />
      </div>
    );
  }
}
