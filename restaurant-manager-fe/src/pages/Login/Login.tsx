import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { host, port } from "../../config/config";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://${host}:${port}/auth/login`, {
        username,
        password,
      });
      const { access_token, permission } = response.data.data;
      localStorage.setItem("access-token", access_token);
      localStorage.setItem("username", username);
      localStorage.setItem("permission", permission);

      if (permission === "admin") {
        navigate("/admin");
      } else {
        navigate("/employee");
      }
      
    } catch (error) {
      setError("Tên đăng nhập hoặc mật khẩu không đúng");
    }
  };

  return (
    <div className='login-page'>
      <form onSubmit={handleLogin} className='login-form'>
        <h2>Đăng Nhập</h2>
        {error && <p className='error'>{error}</p>}
        <div className='form-group'>
          <label htmlFor='username'>Tên đăng nhập:</label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Mật khẩu:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Đăng Nhập</button>
      </form>
    </div>
  );
};

export default Login;
