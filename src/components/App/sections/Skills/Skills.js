import React, { Component } from 'react';

import skillIcon from './../../../../resources/icons/skills.svg';

import skills from '../../../../data/skills';

import Section from '../../Section/Section';

import './Skills.css';

class Skills extends Component {

  renderSkillItem = (skillItem) => {
    return <div style={{
      borderColor: skillItem.color,
      backgroundColor: skillItem.color
    }} className="Skill" key={skillItem.title}>
      <div className="content" style={{
        color: '#FFFFFF'
      }}>
        {skillItem.icon}
        <span>{skillItem.title}</span>
      </div>
    </div>;
  }

  render() {
    return <div className="Skills">
      <Section icon={skillIcon} title={'Skills'} list={skills} render={this.renderSkillItem}></Section>
    </div>;
  }
}

export default Skills;
