import React, { Component } from 'react';

import './Icon.css';

class Icon extends Component {
  render() {
    return <div className="Icon">
      <div className="Icon-content">
        <span className={'layer layer-1 ' + this.props.icon} style={{ color: this.props.color }}></span>
        <span className={'layer layer-2 ' + this.props.icon} style={{ color: this.props.color }}></span>
        <span className={'layer layer-3 ' + this.props.icon} style={{ color: this.props.color }}></span>
      </div>
    </div>;
  }
}

export default Icon;
