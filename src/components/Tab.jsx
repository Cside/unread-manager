import React from 'react';

class Tabs extends React.Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
  }

  render = () => {
    // const { actions } = this.props;
    const { name } = this.props;

    return (
      <div>{name}</div>
    );
  }
}

export default Tabs;
