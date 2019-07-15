import React, { Component } from 'react';

import certification from '../../../../data/certification';

import Section from '../../Section/Section';

import './Certifications.css';

class Certifications extends Component {

  renderCertificationItem = (certificationItem) => {
    return <div key={certificationItem.title} style={{
      backgroundColor: certificationItem.color
    }} className="Certification">
      <span className="content">
        <span className={certificationItem.icon} style={{
          color: '#FFFFFF'
        }}></span>
        <span>{certificationItem.title} @ {certificationItem.organism}</span>
      </span>
    </div>;
  }

  render() {
    return <div className="Certifications">
      <Section list={certification.list} render={this.renderCertificationItem}></Section>
    </div>;
  }
}

export default Certifications;
