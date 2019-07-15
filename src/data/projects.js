
import imgAirdata1 from './../resources/images/projects/airdata_1.webp';

import imgBcfont1 from './../resources/images/projects/bcfont_1.webp';

import imgEvento1 from './../resources/images/projects/evento_1.webp';
import imgEvento2 from './../resources/images/projects/evento_2.webp';

import imgVelov1 from './../resources/images/projects/velov_1.webp';
import imgVelov2 from './../resources/images/projects/velov_2.webp';

import imgCryptoviewer1 from './../resources/images/projects/cryptoviewer_1.webp';

import imgBmw1 from './../resources/images/projects/bmw_1.webp';
import imgBmw2 from './../resources/images/projects/bmw_2.webp';

import imgPdt1 from './../resources/images/projects/pdt_1.webp';
import imgPdt2 from './../resources/images/projects/pdt_2.webp';

import imgOvh1 from './../resources/images/projects/ovh_1.webp';

const projects = [
  {
    title: 'Air-Data',
    description: 'Airlines Data Viewer with 800+ companies and 10,000+ routes',
    icon: 'icon icon-air-data',
    color: '#FF4500',
    website: 'https://k044n51lk5.codesandbox.io/',
    images: [
      imgAirdata1
    ],
    links: [
      {
        icon: 'icon icon-codesandbox',
        link: 'https://codesandbox.io/s/k044n51lk5',
        title: 'CodeSandbox'
      },
      {
        icon: 'icon icon-github',
        link: 'https://github.com/bchoubert/air-data',
        title: 'GitHub Repository'
      }
    ],
    technologies: [
      {
        icon: 'icon icon-firebase-alt',
        title: 'Firebase Real-Time Database'
      },
      {
        icon: 'icon icon-vuejs',
        title: 'VueJS'
      },
      {
        icon: 'icon icon-leaflet',
        title: 'Leaflet'
      },
      {
        icon: 'icon icon-qgis',
        title: 'QGis'
      }
    ]
  },
  {
    title: 'BC-Font',
    description: 'The Developer Font with 800+ icons',
    icon: 'icon icon-bcfont-alt',
    color: '#EA2C37',
    website: 'https://bchoubert.github.io/bc-font/',
    images: [
      imgBcfont1
    ],
    links: [
      {
        icon: 'icon icon-npm',
        link: 'https://www.npmjs.com/package/bc-font',
        title: 'Npm Package'
      },
      {
        icon: 'icon icon-github',
        link: 'https://github.com/bchoubert/bc-font',
        title: 'GitHub Repository'
      }
    ],
    technologies: [
      {
        icon: 'icon icon-gimp',
        title: 'Gimp'
      },
      {
        icon: 'icon icon-webpack',
        title: 'Webpack'
      },
      {
        icon: 'icon icon-inkscape',
        title: 'Inkscape'
      }
    ]
  },
  {
    title: 'Evento',
    description: 'World-wide public events',
    icon: 'icon icon-evento-alt',
    color: '#E91E63',
    images: [
      imgEvento1,
      imgEvento2
    ],
    links: [
      {
        icon: 'icon icon-github',
        link: 'https://github.com/bchoubert/evento',
        title: 'GitHub Repository'
      }
    ],
    technologies: [
      {
        icon: 'icon icon-express',
        title: 'NodeJS Express'
      },
      {
        icon: 'icon icon-asp',
        title: 'ASP.net'
      },
      {
        icon: 'icon icon-laravel',
        title: 'Laravel'
      },
      {
        icon: 'icon icon-php',
        title: 'PHP'
      },
      {
        icon: 'icon icon-Spring',
        title: 'Spring'
      },
      {
        icon: 'icon icon-symfony-alt',
        title: 'Symfony'
      },
      {
        icon: 'icon icon-angular',
        title: 'Angular'
      },
      {
        icon: 'icon icon-leaflet',
        title: 'Leaflet'
      }
    ]
  },
  {
    title: 'BI - Velov',
    description: 'Deep analysis of French renting bike company',
    icon: 'icon icon-velov-alt',
    color: '#E1061E',
    website: 'https://bchoubert.github.io/bi-velov/',
    images: [
      imgVelov1,
      imgVelov2
    ],
    links: [
      {
        icon: 'icon icon-github',
        link: 'https://github.com/bchoubert/bi-velov/',
        title: 'GitHub Repository'
      }
    ],
    technologies: [
      {
        icon: 'icon icon-jquery',
        title: 'jQuery'
      },
      {
        icon: 'icon icon-chartjs',
        title: 'ChartJS'
      },
      {
        icon: 'icon icon-leaflet',
        title: 'Leaflet'
      },
      {
        icon: 'icon icon-talend-alt',
        title: 'Talend ETL'
      },
      {
        icon: 'icon icon-qliksense',
        title: 'Qlik Sense'
      }
    ]
  },
  {
    title: 'Crypto Viewer',
    description: 'Crypto Tracker Mobile App',
    icon: 'icon icon-crypto-viewer',
    color: '#1543E4',
    images: [
      imgCryptoviewer1
    ],
    links: [
      {
        icon: 'icon icon-github',
        link: 'https://github.com/bchoubert/crypto-viewer',
        title: 'GitHub Repository'
      }
    ],
    technologies: [
      {
        icon: 'icon icon-react-native',
        title: 'React Native'
      },
      {
        icon: 'icon icon-expo',
        title: 'Expo'
      },
      {
        icon: 'icon icon-typescript',
        title: 'TypeScript'
      }
    ]
  },
  {
    title: 'BMW Car Configurator',
    description: 'Complete car configurator',
    icon: 'icon icon-bmw',
    color: '#0093DD',
    images: [
      imgBmw1,
      imgBmw2
    ],
    links: [
      {
        icon: 'icon icon-github',
        link: 'https://github.com/bchoubert/car-configurator/',
        title: 'GitHub Repository'
      }
    ],
    technologies: [
      {
        icon: 'icon icon-jquery',
        title: 'jQuery'
      },
      {
        icon: 'icon icon-python',
        title: 'Python'
      },
      {
        icon: 'icon icon-flask',
        title: 'Flask'
      },
      {
        icon: 'icon icon-sqlite',
        title: 'SQLite'
      }
    ]
  },
  {
    title: 'Produits du Tiroir',
    description: 'Branding and Web Marketing Strategy, building Terroir\'s French products website',
    icon: 'icon icon-pdt',
    color: '#888888',
    images: [
      imgPdt1,
      imgPdt2
    ],
    links: [
      {
        icon: 'icon icon-github',
        link: 'https://github.com/Produits-du-Tiroir',
        title: 'GitHub Page'
      }
    ],
    technologies: [
      {
        icon: 'icon icon-wordpress',
        title: 'WordPress'
      },
      {
        icon: 'icon icon-prestashop',
        title: 'PrestaShop'
      },
      {
        icon: 'icon icon-google-analytics',
        title: 'Analytics'
      },
      {
        icon: 'icon icon-facebook-api',
        title: 'Facebook APIs'
      }
    ]
  },
  {
    title: 'OVH Viewer',
    description: 'OVH alternative profile &amp; services viewer',
    icon: 'icon icon-ovh',
    color: '#1d68b8',
    images: [
      imgOvh1
    ],
    links: [],
    technologies: [
      {
        icon: 'icon icon-express',
        title: 'NodeJS Express'
      },
      {
        icon: 'icon icon-react',
        title: 'React'
      },
      {
        icon: 'icon icon-typescript',
        title: 'TypeScript'
      },
      {
        icon: 'icon icon-mdbootstrap',
        title: 'MDBootstrap React'
      }
    ]
  },
];

export default projects;
