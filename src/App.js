import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './css/stylesheet.css';

import Menu from './Project/Welcome/Navigation';
import Chats from './Project/Chat/chat';
import UserList from './Project/UserList/userList';
import EditUser from './Project/UserList/editUser';
import Document from './Project/Document/document';
import Logout from './Project/Login/logout';
import Welcome from '../src/Project/Welcome/welcome';
import Login from '../src/Project/Login/login';
import Register from './Project/Register/register';
import LoginSuccess from './Project/Login/loginSuccess';
import RegisterSuccess from './Project/Register/registerSuccess';
import NotFound from './Project/Welcome/notFound';

const App = () => {
  const [loginInfo, setLoginInfo] = useState(() => JSON.parse(localStorage.getItem('LoggedInfo')) || {});
  const isLoggedIn = Boolean(loginInfo && Object.keys(loginInfo).length);

  // Update the state when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setLoginInfo(JSON.parse(localStorage.getItem('LoggedInfo')) || {});
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Optionally, directly update the state when handling login/logout
  const handleLogin = (newLoginInfo) => {
    localStorage.setItem('LoggedInfo', JSON.stringify(newLoginInfo));
    setLoginInfo(newLoginInfo);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Menu />}>
          <Route path="/" element={isLoggedIn ? <UserList /> : <Navigate to="/welcome" />} />
          <Route path="chats" element={isLoggedIn ? <Chats /> : <Navigate to="/welcome" />} />
          <Route path="users" element={isLoggedIn ? <UserList /> : <Navigate to="/welcome" />} />
          <Route path="users/edit-user" element={isLoggedIn ? <EditUser /> : <Navigate to="/welcome" />} />
          <Route path="document" element={isLoggedIn ? <Document /> : <Navigate to="/welcome" />} />
          <Route path="loginsuccess" element={<LoginSuccess />} />
        </Route>

        <Route path="logout" element={<Logout />} />
        <Route path="login" element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/users" replace />} />
        <Route path="welcome" element={!isLoggedIn ? <Welcome /> : <Navigate to="/users" replace />} />
        <Route path="register" element={!isLoggedIn ? <Register /> : <Navigate to="/users" replace />} />
        <Route path="registersuccess" element={!isLoggedIn ? <RegisterSuccess /> : <Navigate to="/users" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
