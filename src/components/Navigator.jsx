import { Link } from 'react-router';
import React from 'react';
import Menus from '../constants/Menus';

class Navigator extends React.Component {
  // static propTypes = {
  // }

  render() {
    // const { actions } = this.props;

    return (
      <ul>
        {Menus.map(menu =>
          <li key={menu}>
            <Link to={`/${menu}`}>{menu}</Link>
          </li>,
        )}
      </ul>
    );
  }
}

export default Navigator;
