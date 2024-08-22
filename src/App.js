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


const PrivateRoute = ({ children }) => {
    const isLoggedIn = !!localStorage.getItem('LoggedInfo'); // Check if user is logged in
    return isLoggedIn ? children : <Navigate to="" />;
};

const App = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Menu />}>
          <Route path="" element={ <PrivateRoute><UserList /></PrivateRoute> } />
          <Route path="chats" element={ <PrivateRoute><Chats /></PrivateRoute> } />
          <Route path="users" element={ <PrivateRoute><UserList /></PrivateRoute> } />
          <Route path="users/edit-user" element={ <PrivateRoute><EditUser /></PrivateRoute> } />
          <Route path="document" element={ <PrivateRoute><Document /></PrivateRoute> } />
          <Route path="loginsuccess" element={<LoginSuccess />} />
        </Route>

        <Route path="logout" element={<Logout />} />
        <Route path="login" element={ <Login /> } />
        <Route path="welcome" element={ <Welcome /> } />
        <Route path="register" element={ <Register /> } />
        <Route path="registersuccess" element={ <RegisterSuccess /> } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
