// importing the packing 
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// making auth
const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    // useEffect 

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const res = await axios.get('/api/users', {
            headers: { 'x-auth-token': token },
          });
          setUser(res.data);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    checkUser();
  }, []);


//   login method 
const login = async (email, password) => {
    const res = await axios.post('/api/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
  };


//   logout method 
const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };






