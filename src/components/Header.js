import React, { Component } from 'react';
import Search from './Search';

const headerStyle = {
  background: '#ff7043',
  display: 'flex',
  justifyContent: 'space-between'
};

const logoContainer = {
  display: 'flex',
  alignItems: 'flex-end',
  padding: 10
}

class Header extends Component {

  render() {
    const {
      value,
      onChange,
      onSubmit
    } = this.props;

    return (
        <div style={headerStyle}>
          <div style={logoContainer}>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" width="30px" height="30px" style={{background: '#fff', border: '1px solid #fff'}} viewBox="0 0 31.254 31.254">
              <g>
                <path d="M0,0.393v30.469h31.254V0.393H0z M17.623,15.27v10.322h-3.992V15.27L7.429,5.192l4.61-0.023c0,0,3.66,6.486,3.684,6.511   h0.071c0.024-0.025,3.779-6.488,3.779-6.488h4.253L17.623,15.27z" data-original="#000000" data-old_color="#ff7043" fill="#ff7043"/>
              </g>
              </svg>
              <h1>
                <a className="logo" href='/'>Hacker News </a>
              </h1>
            </div>
            <Search
              value={value}
              onChange={onChange}
              onSubmit={onSubmit}
            />
        </div>
    );
  }
}


export default Header;