import React from "react";
import "./EmployeeManagement.css";
import Navbar from "../../components/Navbar/Navbar";

const EmployeeManagement: React.FC = () => {
  return (
    <div className='employee-management'>
      <h1>Quản lý Nhân viên</h1>
      <Navbar />
    </div>
  );
};

export default EmployeeManagement;
