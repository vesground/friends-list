import React from 'react';
import PropTypes from 'prop-types';

import 'src/components/table/TableHead.less'

import {
  TableHead,
  TableRow,
  TableCell,
  Tooltip,
  TableSortLabel,
  Checkbox,
} from '@material-ui/core';

const columns = [
  { name: 'name', label: 'Name' },
  { name: 'surname', label: 'Surname' },
  { name: 'age', label: 'Age' },
  { name: 'phone', label: 'Phone' },
]

export default class UsersTable extends React.Component {
  static propTypes = {
    sortBy: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
    onHandleRequestSort: PropTypes.func.isRequired,
  }

  createSortHandler = colunmName => event => {
    this.props.onHandleRequestSort(event, colunmName);
  };

  // state = {
  // }

  render() {
    const { sortBy, order, selectedRowsCount, rowsPerPage, onSelectAllClick } = this.props;
    const fontSize = { fontSize: '1rem' };

    return (
      <TableHead className='head'>
        <TableRow className='head__row'>
          {columns.map((column, index) => {
            return (
              <TableCell key={index}
                         style={fontSize}
                         sortDirection={sortBy === column.name ? order : false} >
                <Tooltip title="Sort"
                         placement={'bottom-start'}
                         enterDelay={1000} >
                  <TableSortLabel active={sortBy === column.name}
                                  direction={order}
                                  onClick={this.createSortHandler(column.name)} >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            )
          })}
        </TableRow>
      </TableHead>
    );
  }
}
