import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code' /> Moovie
        </Link>
      </h1>
      <ul>
        <Link to='/register'> Register </Link>
        <Link to='/login'> Login </Link>
      </ul>
    </nav>
  );
};

export default NavBar;
