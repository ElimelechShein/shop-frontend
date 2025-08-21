import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import api, { setAuthToken } from '../lib/api';

// הגדרת ממשק למשתמש
interface User {
  id: string;
  email: string;
  whatsapp: string;
  stores: string[];
}

// הגדרת ממשק לקונטקסט האימות
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, whatsapp: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// הגדרת כתובת השרת מתוך api.ts

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // בדיקה אם יש טוקן שמור בזיכרון המקומי
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      // קבלת פרטי המשתמש מהשרת
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  // פונקציה לקבלת פרטי המשתמש
  const fetchUser = async () => {
    try {
      const response = await api.get(`/auth/profile`);
      setUser(response.data);
    } catch (error) {
      console.error('שגיאה בקבלת פרטי המשתמש:', error);
      localStorage.removeItem('token');
      setAuthToken(null);
    } finally {
      setLoading(false);
    }
  };

  // פונקציית התחברות
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await api.post(`/auth/login`, {
        email,
        password
      });

      const { token, user } = response.data;
      
      // שמירת הטוקן בזיכרון המקומי
      localStorage.setItem('token', token);
      setAuthToken(token);
      
      setUser(user);
      return true;
    } catch (error) {
      console.error('שגיאה בהתחברות:', error);
      return false;
    }
  };

  // פונקציית הרשמה
  const register = async (email: string, password: string, whatsapp: string): Promise<boolean> => {
    try {
      const response = await api.post(`/auth/register`, {
        email,
        password,
        whatsapp
      });

      const { token, user } = response.data;
      
      // שמירת הטוקן בזיכרון המקומי
      localStorage.setItem('token', token);
      setAuthToken(token);
      
      setUser(user);
      return true;
    } catch (error) {
      console.error('שגיאה בהרשמה:', error);
      return false;
    }
  };

  // פונקציית התנתקות
  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook לשימוש בקונטקסט האימות
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};