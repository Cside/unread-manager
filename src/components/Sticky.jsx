import React from 'react';
import T from '../propTypes';

class Sticky extends React.Component {
  static propTypes = {
    entry:   T.entry,
    actions: T.actions,
  }

  render = () => {
    const { entry, actions } = this.props;

    return entry.togglingSticky ? (
      <img src="/img/loading.gif" />
    ) : (
      <a href="javascript:void(0)" onClick={() => actions.onClickSticky(entry)}>
        <img
          src={`/img/sticky_${entry.readThisLater ? 'on' : 'off'}.png`}
          height="18"
        />
      </a>
    );
  }
}

export default Sticky;
