import React from "react";
import "./BillManagement.css";
import Navbar from "../../components/Navbar/Navbar";

const BillManagement: React.FC = () => {
  return (
    <div className='bill-management'>
      <Navbar />
      <h1>Quản lý Hóa đơn</h1>
    </div>
  );
};

export default BillManagement;
