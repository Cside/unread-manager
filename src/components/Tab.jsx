import React from 'react';

const { string, func } = React.PropTypes;

class Tabs extends React.Component {
  static propTypes = {
    name: string.isRequired,
    onClick: func.isRequired,
  }

  render = () => {
    const { name, onClick } = this.props;

    return (
      <button className="btn btn-default" onClick={onClick}>{name}</button>
    );
  }
}

export default Tabs;
