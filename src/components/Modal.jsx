import React from 'react';

class Navigator extends React.Component {
  state = { content: (<p>initial</p>) };

  handleOpen = () => {
    this.setState({
      content: (
        <div style={{ backgroundColor: 'yellow' }}>
          <p>this is a modal</p>
          <button onClick={this.handleClose}>Close Modal</button>
        </div>
      ),
    });
  }

  handleClose = () => {
    this.setState({ content: null });
  }

  render() {
    // const { actions } = this.props;

    return (
      <div>
        {this.state.content}
        <button onClick={this.handleOpen}>Open Modal</button>
      </div>
    );
  }
}

export default Navigator;
