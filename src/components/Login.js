import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';

const LoginForm = ({ onSwitch, onLogin }) => {
    return (
      <div className="container">
        <div className="form-section">
          <h2>Login</h2>
          <form onSubmit={onLogin}>
            <input type="text" name="username" placeholder="Username" className="form-input" />
            <input type="password" name="password" placeholder="Password" className="form-input" />
            <button type="submit" className="form-button">Login</button>
          </form>
          <button onClick={onSwitch} className="form-button switch-button">Go to Register</button>
        </div>
      </div>
    );
  };
  
  const RegisterForm = ({ onSwitch, onRegister }) => {
    return (
      <div className="container">
        <div className="form-section">
          <h2>Register</h2>
          <form onSubmit={onRegister}>
            <input type="text" name="username" placeholder="Username" className="form-input" />
            <input type="password" name="password" placeholder="Password" className="form-input" />
            <div className="radio-group">
              <input type="radio" id="userType" name="userType" value="user" />
              <label htmlFor="userType" className="form-label">User</label>
            </div>
            <button type="submit" className="form-button">Register</button>
          </form>
          <button onClick={onSwitch} className="form-button switch-button">Go to Login</button>
        </div>
      </div>
    );
  };
  

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);

  const handleLogin = async (event) => {
    event.preventDefault();
    // 获取表单数据
    const username = event.target.username.value;
    const password = event.target.password.value;
    // 实现登录逻辑（例如发送请求到后端）
    console.log('Logging in:', username, password);
    try {
        const response = await axios.post('https://final-project-node-d408.onrender.com/login', { username, password });
        console.log(response.data);
        // 处理登录成功的情况
        alert("Login successful!");
        localStorage.setItem("userName",username)
        localStorage.setItem("password",password)
      } catch (error) {
        console.error('Login error:', error);
        alert('Login Error!!')
        // 处理登录失败的情况
      }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    // 获取表单数据
    const username = event.target.username.value;
    const password = event.target.password.value;
    // 实现注册逻辑
    console.log('Registering:', username, password);
    try {
        const response = await axios.post('https://final-project-node-d408.onrender.com/register', { username, password });
        console.log(response.data);
        alert("Registering successful!")
        // 处理注册成功的情况
      } catch (error) {
        console.error('Registration error:', error);
        alert("Registering ERROR!!!")
        // 处理注册失败的情况
      }
  };

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div>
      {showLogin ? (
        <LoginForm onSwitch={toggleForm} onLogin={handleLogin} />
      ) : (
        <RegisterForm onSwitch={toggleForm} onRegister={handleRegister} />
      )}
    </div>
  );
};

export default Login;
