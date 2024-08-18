import React, { useState } from 'react';
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
  const [loginInfo] = useState(JSON.parse(localStorage.getItem('LoggedInfo')));
  const isLoggedIn = loginInfo && Object.keys(loginInfo).length > 0;;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Menu />}>
          <Route path="" element={isLoggedIn ? <UserList /> : <Navigate to="/welcome" replace />} />
          <Route path="chats" element={isLoggedIn ? <Chats /> : <Navigate to="/welcome" replace />} />
          <Route path="users" element={isLoggedIn ? <UserList /> : <Navigate to="/welcome" replace />} />
          <Route path="users/edit-user" element={isLoggedIn ? <EditUser /> : <Navigate to="/welcome" replace />} />
          <Route path="document" element={isLoggedIn ? <Document /> : <Navigate to="/welcome" replace />} />
          <Route path="loginsuccess" element={<LoginSuccess />} />
        </Route>

        <Route path="logout" element={<Logout />} />
        <Route path="login" element={!isLoggedIn ? <Login /> : <Navigate to="/users" replace />} />
        <Route path="welcome" element={!isLoggedIn ? <Welcome /> : <Navigate to="/users" replace />} />
        <Route path="register" element={!isLoggedIn ? <Register /> : <Navigate to="/users" replace />} />
        <Route path="registersuccess" element={!isLoggedIn ? <RegisterSuccess /> : <Navigate to="/users" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
