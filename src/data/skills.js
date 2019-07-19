import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faCogs, faPaintBrush, faSearchDollar, faDatabase, faServer, faMicrochip, faMobile } from '@fortawesome/free-solid-svg-icons';

const skills = [
  {
    color: '#2962FF',
    title: 'Front-End',
    icon: <FontAwesomeIcon icon={faDesktop} />,
    technologies: [
      {
        icon: 'icon icon-css',
        title: 'CSS'
      },
      {
        icon: 'icon icon-sass',
        title: 'Sass'
      },
      {
        icon: 'icon icon-javascript',
        title: 'JavaScript'
      },
      {
        icon: 'icon icon-typescript',
        title: 'TypeScript'
      },
      {
        icon: 'icon icon-angular',
        title: 'Angular'
      },
      {
        icon: 'icon icon-react',
        title: 'React'
      },
      {
        icon: 'icon icon-vuejs',
        title: 'VueJS'
      },
      {
        icon: 'icon icon-gulp',
        title: 'Gulp'
      },
      {
        icon: 'icon icon-webpack',
        title: 'WebPack'
      }
    ]
  },
  {
    color: '#00BFA5',
    title: 'Back-End',
    icon: <FontAwesomeIcon icon={faCogs} />,
    technologies: [
      {
        icon: 'icon icon-java',
        title: 'Java'
      },
      {
        icon: 'icon icon-spring',
        title: 'Spring'
      }
    ]
  },
  {
    color: '#FF6D00',
    title: 'UI Design',
    icon: <FontAwesomeIcon icon={faPaintBrush} />,
    technologies: [
      
    ]
  },
  {
    color: '#9C50E1',
    title: 'Web Marketing',
    icon: <FontAwesomeIcon icon={faSearchDollar} />,
    technologies: [
      
    ]
  },
  {
    color: '#DD2C00',
    title: 'Databases',
    icon: <FontAwesomeIcon icon={faDatabase} />,
    technologies: [
      
    ]
  },
  {
    color: '#FFAB00',
    title: 'Ops',
    icon: <FontAwesomeIcon icon={faServer} />,
    technologies: [
      
    ]
  },
  {
    color: '#0091EA',
    title: 'Machine Learning / BI / Big Data',
    icon: <FontAwesomeIcon icon={faMicrochip} />,
    technologies: [
      
    ]
  },
  {
    color: '#00C853',
    title: 'Mobile',
    icon: <FontAwesomeIcon icon={faMobile} />,
    technologies: [
      
    ]
  }
];

export default skills;
