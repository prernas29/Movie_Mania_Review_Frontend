import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { showSuccess, showWarning } from '../utils/toastUtils';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = Cookies.get('token');
      if (token) {
        try {
          const response = await axiosInstance.get('/api/v1/user', {
            headers: {
              Authorization: `Bearer ${token}`,  
            },
          });

          setUser(response.data.user); 
        } catch (error) {
        
          showWarning("You are unauthorized");
          navigate("/login")
          Cookies.remove('token');
        }
      }
      else{
        showWarning("You are unauthorized");
        navigate("/login")
      }
    };

    fetchUserDetails();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axiosInstance.post('/api/v1/login', credentials);
        
      const { token, user } = response.data;

      Cookies.set('token', token, { expires: 7 });

      setUser(user);
      navigate("/");
      // showSuccess("You are logged in")
    } catch (error) {
      console.log('Login failed:', error);
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);

    showSuccess("You are logged out");
    navigate("/login")
  };

  return (
    <AuthContext.Provider value={{ user, login, logout , setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
