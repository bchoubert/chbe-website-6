import React, { Component } from 'react';

import projectsIcon from './../../../../resources/icons/projects.svg';

import projects from '../../../../data/projects';

import Section from '../../Section/Section';

import UtilsService from './../../../../services/Utils.service';

import './Projects.css';

class Projects extends Component {

  renderProjectItem = (projectItem) => {
    return <div key={projectItem.title} style={{
      backgroundColor: '#FFFFFF'
    }} className="Project">
      <div className="Project-image" style={{
        backgroundImage: `url("${projectItem.images[0]}")`
      }}></div>
      <div className="Project-inner">
        <div className="details" style={{
          backgroundImage: `linear-gradient(135deg, ${UtilsService.lightenHexColor(projectItem.color, 18)}, ${projectItem.color})`
        }}>
          <div>
            {projectItem.technologies.map(technology =>
              <span>
                <span className={technology.icon}></span>
                <span>{technology.title}</span>
              </span>
            )}
          </div>
          <div>
            {projectItem.links.map(link =>
              <a href={link.link} rel="noopener noreferrer" target="_blank" title={link.title}>
                <span className={link.icon} style={{
                  color: projectItem.color
                }}></span>
              </a>  
            )}
          </div>
          {!!projectItem.website && 
            <div>
              <a className="Project-website" href={projectItem.website} target="_blank" rel="noopener noreferrer" style={{
                color: projectItem.color
              }}>
                Live Website
              </a>
            </div>
          }
        </div>
        <span className="content">
          <span className={projectItem.icon} style={{
            color: projectItem.color
          }}></span>
          <span>{projectItem.title}</span>
          <span className="Project-description">{projectItem.description}</span>
        </span>
      </div>
    </div>;
  }

  render() {
    return <div className="Projects">
      <Section icon={projectsIcon} title={'Side Projects'} list={projects} render={this.renderProjectItem}></Section>
    </div>;
  }
}

export default Projects;
