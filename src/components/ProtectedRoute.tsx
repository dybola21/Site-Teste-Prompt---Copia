import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/admin.css';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-spinner large"></div>
      </div>
    );
  }

  if (!user) {
    // Redireciona para login salvando de onde veio
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && role !== 'admin') {
    // Se a rota exige admin e o usuário é apenas employee
    return (
      <div className="admin-login-wrapper">
        <div className="admin-card" style={{ textAlign: 'center' }}>
          <h1 className="admin-page-title" style={{ color: 'var(--admin-danger)' }}>Acesso Negado</h1>
          <p style={{ marginBottom: '1.5rem', color: 'var(--admin-text-light)' }}>Você não tem permissão para acessar esta página.</p>
          <button 
            onClick={() => window.history.back()} 
            className="admin-btn"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
