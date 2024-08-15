import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <nav className='navbar'>
      <ul className='navbar-list'>
        <li>
          <NavLink
            to='/management/employees'
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Nhân viên
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/management/tables'
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Bàn
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/management/foods'
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Món ăn
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/management/bills'
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Hóa đơn
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
