import React, { Component } from 'react';

import networkIcon from './../../../../resources/icons/networks.svg';

import networks from '../../../../data/networks';

import Section from '../../Section/Section';

import './Networks.css';

class Networks extends Component {

  renderNetworkItem = (networkItem) => {
    return <div style={{
      borderColor: networkItem.color,
      backgroundColor: networkItem.color
    }} className="Network" key={networkItem.name}>
      <a className="content" target="_blank" rel="noopener noreferrer" href={networkItem.link} style={{
        color: '#FFFFFF'
      }}>
        <span className={networkItem.icon} style={{
          color: '#FFFFFF'
        }}></span>
        <span>{networkItem.name}</span>
      </a>
    </div>;
  }

  render() {
    return <div className="Networks">
      <Section icon={networkIcon} title={'Networks'} list={networks} render={this.renderNetworkItem}></Section>
    </div>;
  }
}

export default Networks;
