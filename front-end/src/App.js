import React from 'react';
import MyRoutes from './routes';
import AuthProvider from './context/Auth.context';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <MyRoutes />
    </AuthProvider>
  );
}

export default App;
