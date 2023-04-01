
import './App.css';

import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Employees from './pages/Employees';
import Header from './components/Header';
import CreateEmployee from './pages/CreateEmployee';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  return (
    <>
    <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
    <Routes>
      <Route index element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
      <Route path="employees" element={<ProtectedRoute >
        <Employees/>
      </ProtectedRoute>} />
      <Route path="new-employee" element={<ProtectedRoute>
        <CreateEmployee />
      </ProtectedRoute>}/>
      <Route path="*" element={<NotFound />}/>
    </Routes>
    </> 
  );
}

export default App;
