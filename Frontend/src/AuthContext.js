import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('isLoggedIn'));
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      // Make an API request to your server to authenticate
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);
  
      if (data.success) {
        setIsLoggedIn(true);
        setUser(data.user); // Set user information received from the server
        console.log(data.user.userId + "+++++test user print");
        localStorage.setItem('isLoggedIn', 'true');
      } else {
        // Handle login failure, show error message, etc.
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('isLoggedIn');
  };

  const getUserId = () => {
    return user ? user.id : null;
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;