import React from 'react';
import { Routes } from 'react-router-dom';
import MyRoutes from './routes';
import AuthProvider from './context/Auth.context';
import './App.css';


function App() {
  return (
    <Routes>
      <AuthProvider>
        <MyRoutes />
      </AuthProvider>
    </Routes>
  );
}

export default App;
