import React, { useContext, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Cookies from "js-cookie";
import { showSuccess } from "../../utils/toastUtils";
import AuthContext from "../../context/AuthContext";
const Login = ({ setLoginUser }) => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Access the login function from context

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const loginUser = () => {
    login(user);
  };

  return (
    <div className="login-container">
      <div className="login">
        <h1>Login</h1>
        <input
          type="text"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Enter your Email"
        ></input>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Enter your Password"
        ></input>
        <div className="button" onClick={loginUser}>
          Login
        </div>
        <div>or</div>
        <div className="button" onClick={() => navigate("/register")}>
          Register
        </div>
      </div>
    </div>
  );
};

export default Login;
