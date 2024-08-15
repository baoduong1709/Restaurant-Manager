// src/pages/Home/Home.tsx

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link để điều hướng

const Home: React.FC = () => {
  return (
    <div className="home">
      <h1>Chào mừng đến với Quán Ăn XYZ!</h1>
      <p>Chúng tôi có những món ngon nhất dành cho bạn.</p>
      <Link to="/table">
        <button>Khám phá thực đơn</button>
      </Link>
    </div>
  );
}

export default Home;
