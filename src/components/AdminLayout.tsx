
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Settings, LogOut, MessageSquare, Briefcase, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/admin.css';

const AdminLayout = () => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div style={{ width: '32px', height: '32px', backgroundColor: 'var(--admin-primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
            A
          </div>
          <h2>Admin Panel</h2>
        </div>

        <nav className="admin-nav">
          <NavLink 
            to="/admin/dashboard" 
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink 
            to="/admin/leads" 
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
          >
            <MessageSquare size={20} />
            <span>Leads / Contatos</span>
          </NavLink>

          {role === 'admin' && (
            <>
              <NavLink 
                to="/admin/servicos" 
                className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
              >
                <Briefcase size={20} />
                <span>Serviços</span>
              </NavLink>

              <NavLink 
                to="/admin/depoimentos" 
                className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
              >
                <Star size={20} />
                <span>Depoimentos</span>
              </NavLink>

              <NavLink 
                to="/admin/usuarios" 
                className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
              >
                <Users size={20} />
                <span>Usuários</span>
              </NavLink>

              <NavLink 
                to="/admin/configuracoes" 
                className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
              >
                <Settings size={20} />
                <span>Configurações</span>
              </NavLink>
            </>
          )}
        </nav>

        <div className="admin-sidebar-footer">
          <div style={{ marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--admin-text-light)' }}>
            <div>Logado como:</div>
            <div style={{ fontWeight: '600', color: 'var(--admin-text)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.email}
            </div>
            <div style={{ fontSize: '0.75rem', marginTop: '0.25rem', textTransform: 'capitalize' }}>
              Perfil: {role || 'Não definido'}
            </div>
          </div>
          
          <button onClick={handleLogout} className="admin-logout-btn">
            <LogOut size={20} />
            <span>Sair do Sistema</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="admin-content">
        <header className="admin-topbar">
          {/* Pode adicionar notificações ou menu de perfil aqui no futuro */}
        </header>
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
