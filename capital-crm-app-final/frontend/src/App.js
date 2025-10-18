
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './views/Login';
import Dashboard from './views/Dashboard';

function App() {
  const [token, setToken] = React.useState(localStorage.getItem('cap_token'));

  const onLogin = (t) => {
    setToken(t);
    localStorage.setItem('cap_token', t);
  };

  const onLogout = () => {
    setToken(null);
    localStorage.removeItem('cap_token');
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login onLogin={onLogin} />} />
        <Route path='/dashboard' element={token ? <Dashboard token={token} onLogout={onLogout} /> : <Navigate to='/login' />} />
        <Route path='/' element={<Navigate to='/dashboard' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
