import React from 'react';

class FadeOut extends React.Component {
  state = { opacity: 1, visible: 1 };

  hide = () => {
    this.setState({ opacity: 0 });
    setTimeout(() => {
      this.setState({ visible: false })
    }, 1000);
  }

  render() {
    const div = this.state.visible ? (
      <div style={{
        backgroundColor: 'yellow',
        height: '200px',
        transition: 'opacity 1s',
        opacity: this.state.opacity,
      }}>
        <p>Hello</p>
      </div>
    ) : null;

    return (
      <Wrapper onClick={this.hide}>
        {div}
      </Wrapper>
    );
  }
}

class Wrapper extends React.Component {
  render() {
    const { onClick, children } = this.props;

    return (
      <div>
        {children}
        <button onClick={onClick}>fadeout</button>
      </div>
    );
  }
}

export default FadeOut;
