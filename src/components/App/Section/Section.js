import React, { Component } from 'react';

import './Section.css';

class Section extends Component {

  render() {
    return <div className="Section">
      <div className="Section-list">
        {!!this.props.icon && 
          <span className="Section-icon">
            <img src={this.props.icon} alt={this.props.title + ' icon'} />
          </span>
        }
        <h1>
          {this.props.title}
        </h1>
        {this.props.list.map(this.props.render)}
      </div>
    </div>;
  }
}

export default Section;
