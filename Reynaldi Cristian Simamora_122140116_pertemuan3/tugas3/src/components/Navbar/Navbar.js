import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>BookShelf</h1>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
            My Books
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/stats" className={({ isActive }) => isActive ? 'active' : ''}>
            Statistics
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

