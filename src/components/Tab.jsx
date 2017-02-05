import React from 'react';
import T from '../propTypes';

class Tabs extends React.Component {
  static propTypes = {
    name:    T.string.isRequired,
    onClick: T.func.isRequired,
  }

  render = () => {
    const { name, onClick } = this.props;

    return (
      <button className="btn btn-default" onClick={onClick}>{name}</button>
    );
  }
}

export default Tabs;
