'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const useAuth = (redirectTo = "/login", delay = 3000) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('jwtToken');
      
      if (!token) {
        setAuthError("Você precisa estar logado para acessar esta página. Redirecionando para o login...");
        setIsAuthenticated(false);
        
        setTimeout(() => {
          router.push(redirectTo);
        }, delay);
      } else {
        setIsAuthenticated(true);
        setAuthError("");
      }
      
      setIsLoading(false);
    }
  }, [router, redirectTo, delay]);

  const checkAuth = () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('jwtToken');
      return !!token;
    }
    return false;
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwtToken');
      router.push(redirectTo);
    }
  };

  return {
    isAuthenticated,
    authError,
    isLoading,
    checkAuth,
    logout,
  };
};
