import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import 'src/components/Table.less';

export default function Table({ users, removeUser }) {
  return (
    <div className='tip-wrapper'>
      <span className='tip'>Click here to switch modes</span>
    </div>
  );
}

Table.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeUser: PropTypes.func.isRequired,
};
