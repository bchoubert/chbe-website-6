import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faUniversity, faCalendar } from '@fortawesome/free-solid-svg-icons';

import educationIcon from './../../../../resources/icons/education.svg';

import education from '../../../../data/education';

import Section from '../../Section/Section';

import UtilsService from './../../../../services/Utils.service';

import './Education.css';

class Education extends Component {

  renderEducationItem = (educationItem) => {
    return <div key={educationItem.title} style={{
      backgroundColor: '#FFFFFF'
    }} className={(!!educationItem.details) ? 'Education Education--extended' : 'Education'}>
      <div className="details" style={{
        backgroundImage: `linear-gradient(135deg, ${UtilsService.lightenHexColor(educationItem.color, 18)}, ${educationItem.color})`
      }}>
        <div>
          <h4>
            <FontAwesomeIcon icon={faMapMarker}></FontAwesomeIcon>
            {educationItem.location}
          </h4>
        </div>
        <div>
          <h4>
            <FontAwesomeIcon icon={faUniversity}></FontAwesomeIcon>
            {educationItem.school}
          </h4>
        </div>
        <div>
          <h4>
            <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>
            {UtilsService.renderDateInterval(educationItem.dates)}
          </h4>
        </div>
        {!!educationItem.details && educationItem.details.skills.map(skillItem => 
          <div>
            <h4>{skillItem.title}</h4>
            {skillItem.list.map(skill => 
              <span>{skill}</span>
            )}
          </div>
        )}
      </div>
      <span className="content">
        <span className={educationItem.icon} style={{
          color: educationItem.color
        }}></span>
        <span>{educationItem.title} @ {educationItem.school}</span>
      </span>
    </div>;
  }

  render() {
    return <div className="Educations">
      <Section icon={educationIcon} title={'Education'} list={education} render={this.renderEducationItem}></Section>
    </div>;
  }
}

export default Education;
