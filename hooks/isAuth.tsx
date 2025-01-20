'use client'

import { useState, useEffect } from 'react';
export const useAuth = () => {
    const [isAuth, setIsAuth] = useState(false);
 
    const checkAuth = () => {
      const cookies = document.cookie;
      const tokenExists = cookies.includes("login token"); // Check if the "login token" cookie exists
      setIsAuth(tokenExists); // Update state
  };

  useEffect(() => {
      checkAuth(); // Initial check when component mounts

      // Optional: Polling or observer for cookie changes (e.g., if cookies are set externally)
      const interval = setInterval(() => {
          checkAuth();
      }, 1000);

      return () => clearInterval(interval); // Clean up interval
  }, []);
      
    
      const logout = () => {
        document.cookie = "login token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setIsAuth(false); 
        window.location.reload()
        console.log("Logged out successfully");
    };

    return { isAuth, logout,checkAuth };
    
};
