import React, { useContext, useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Cookies from "js-cookie";
import { showError, showSuccess } from "../../utils/toastUtils";
import AuthContext from "../../context/AuthContext";

const Register = () => {
  const history = useNavigate();

  const { user, setUser } = useContext(AuthContext);

  const [registerUser, setregisterUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setregisterUser({
      ...registerUser,
      [name]: value,
    });
  };

  const register = () => {
    const { name, email, password } = registerUser;

    if (name && email && password) {
      axiosInstance.post("/api/v1/register", registerUser).then((response) => {
        showSuccess("Registration successfull");
        const { token, user } = response.data;
        setUser(user);
        Cookies.set("token", token, { expires: 7 });
      });
    } else {
      showError("Invalid input");
    }
  };

  return (
    <div className="register-container">
      <div className="register">
        <h1>Register</h1>
        <input
          type="text"
          name="name"
          value={registerUser.name}
          placeholder="Your Name"
          onChange={handleChange}
        ></input>
        <input
          type="text"
          name="email"
          value={registerUser.email}
          placeholder="Your Email"
          onChange={handleChange}
        ></input>

        <input
          type="password"
          name="password"
          value={registerUser.password}
          placeholder="Your Password"
          onChange={handleChange}
        ></input>
        <input
          type="password"
          name="reEnterPassword"
          value={registerUser.reEnterPassword}
          placeholder="Re-enter Password"
          onChange={handleChange}
        ></input>
        <div className="button" onClick={register}>
          Register
        </div>
        <div>or</div>
        <div className="button" onClick={() => history("/login")}>
          Login
        </div>
      </div>
    </div>
  );
};

export default Register;
