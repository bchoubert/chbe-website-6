import React, { Component } from 'react';
import Typed from 'react-typed';

import pattern from './../../../../resources/images/gif-pattern.gif';

import './Header.css';

class Header extends Component {
  render() {
    return <div className="Header" style={{ backgroundImage: `url(${pattern})` }}>
      <h1>Bertrand Choubert</h1>
      <div className="header-content">
        <Typed 
          strings={[
            'I\'m a French CS Engineer.',
            'I\'m a Web Developer &amp; UI Designer.',
            'I\'m open to opportunities.',
            'What about you?']}
          typeSpeed={40}
          backSpeed={20}
          smartBackspace={false}
          loopCount={Infinity}
          backDelay={1000}
          loop />
      </div>
    </div>;
  }
}

export default Header;
