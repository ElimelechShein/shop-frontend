import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Loading from './Loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  // אם עדיין טוען, הצג מסך טעינה
  if (loading) {
    return <Loading />;
  }

  // אם אין משתמש מחובר, הפנה לדף התחברות
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // אם המשתמש מחובר, הצג את התוכן המוגן
  return <>{children}</>;
};

export default ProtectedRoute;