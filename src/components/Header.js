import React from 'react';
import '../styles/Header.scss';

function Header() {
  return (
    <div className="header">
      <div className="headerTitle">
        <img src="logo.svg" alt="logo" />
        <h1>Algorithms in Action</h1>
      </div>
      <div className="navButton">
        <button type="button">
          Contribute
        </button>
        <button type="button">
          Settings
        </button>
      </div>
    </div>
  );
}

export default Header;
