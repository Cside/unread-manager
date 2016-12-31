import React from 'react';
import Tab from './Tab';

class Tabs extends React.Component {

  render = () => {
    // const { actions } = this.props;

    return (
      <div>
        {
          ['全て', 'あとで読む'].map((name) => {
            return <Tab key={name} name={name} />;
          })
        }
      </div>
    );
  }
}

export default Tabs;
