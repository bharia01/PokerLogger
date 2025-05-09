// src/components/AdminRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { JSX } from 'react';

type Props = {
  children: JSX.Element;
};

const AdminRoute = ({ children }: Props) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'admin') {
    return <div className="p-6 text-red-600 text-lg">❌ You do not have permission to view this page.</div>;
  }

  return children;
};

export default AdminRoute;
