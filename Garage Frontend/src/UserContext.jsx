import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 👇 try to restore user from backend on refresh
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:8000/reload/me', {
          withCredentials: true,
        });

        setUser(res.data.details); // assuming your server sends { user: { ... } }
      } catch (err) {
        setUser(null); // user is not logged in or token is invalid
      } finally{
        setLoading(false); 
      }
    };

    fetchUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    await axios.get('http://localhost:8000/logout', { withCredentials: true });
    setUser(null); // clear user from context
  };

  return (
    <UserContext.Provider value={{ user, login: setUser, logout: () => setUser(null), loading }}>
    {children}
  </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
