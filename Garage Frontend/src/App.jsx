import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext';
import LoginForm from './Components/LoginForm';
import Dashboard from './Components/Dashboard';
import ProtectedRoute from './Components/ProtectedRoutes';



function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
