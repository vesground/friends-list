import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import 'src/components/table/TableHead.less';

import {
  TableHead,
  TableRow,
  TableCell,
  Tooltip,
  TableSortLabel,
  Checkbox,
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const columns = [
  { name: 'name', label: 'Name' },
  { name: 'surname', label: 'Surname' },
  { name: 'age', label: 'Age' },
  { name: 'phone', label: 'Phone' },
];

export default class UsersTableHead extends React.Component {
  static propTypes = {
    sortBy: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
    onHandleRequestSort: PropTypes.func.isRequired,
  }

  createSortHandler = colunmName => (event) => {
    const { onHandleRequestSort } = this.props;
    onHandleRequestSort(event, colunmName);
  };

  render() {
    const { sortBy, order } = this.props;

    return (
      <TableHead class='head'>
        <TableRow class='head__row'>
          {columns.map((column, index) => (
            <TableCell key={index}
                       class='head__cell'
                       sortDirection={sortBy === column.name ? order : false}>
              <Tooltip title='Sort'
                       placement='bottom-start'
                       enterDelay={1000}>
                <TableSortLabel active={sortBy === column.name}
                                direction={order}
                                onClick={this.createSortHandler(column.name)}>
                  {column.label}
                </TableSortLabel>
              </Tooltip>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
}
