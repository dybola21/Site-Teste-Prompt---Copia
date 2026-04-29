
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/admin.css';

const Dashboard = () => {
  const { user, role } = useAuth();

  return (
    <div>
      <h1 className="admin-page-title">Dashboard</h1>
      
      <div className="admin-card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1rem', color: 'var(--admin-primary)' }}>
          Bem-vindo ao Painel de Controle
        </h2>
        <p style={{ color: 'var(--admin-text-light)', lineHeight: 1.6 }}>
          Olá, <strong>{user?.email}</strong>! Seu nível de acesso é: <strong>{role || 'Não definido'}</strong>.
        </p>
        <p style={{ color: 'var(--admin-text-light)', lineHeight: 1.6, marginTop: '1rem' }}>
          Utilize o menu lateral para gerenciar o conteúdo do site, os contatos recebidos e as configurações gerais.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {/* Placeholders for future widgets */}
        <div className="admin-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ margin: 0, color: 'var(--admin-text-light)', fontSize: '0.875rem', textTransform: 'uppercase' }}>Novos Leads</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--admin-primary)', marginTop: '0.5rem' }}>0</div>
        </div>
        
        <div className="admin-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ margin: 0, color: 'var(--admin-text-light)', fontSize: '0.875rem', textTransform: 'uppercase' }}>Serviços Ativos</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--admin-primary)', marginTop: '0.5rem' }}>0</div>
        </div>
        
        <div className="admin-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ margin: 0, color: 'var(--admin-text-light)', fontSize: '0.875rem', textTransform: 'uppercase' }}>Depoimentos</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--admin-primary)', marginTop: '0.5rem' }}>0</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
