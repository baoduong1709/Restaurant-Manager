import React from "react";
import { Link } from "react-router-dom"; // Import Link để điều hướng

const Home: React.FC = () => {
  return (
    <div className='home' style={{ textAlign: "center", padding: "50px" }}>
      <h1>Quán Ăn XYZ</h1>
      <Link to='/table'>
        <button style={{ padding: "10px 20px", fontSize: "16px" }}>
          Thực Đơn
        </button>
      </Link>
    </div>
  );
};

export default Home;
