import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/admin.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || '/admin/dashboard';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      login(email);
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error(err);
      setError('E-mail ou senha inválidos.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-card">
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--admin-primary)' }}>
          Acesso Restrito
        </h2>
        
        <form onSubmit={handleLogin}>
          <div className="admin-input-group">
            <label className="admin-label" htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              className="admin-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Digite seu e-mail"
            />
          </div>

          <div className="admin-input-group">
            <label className="admin-label" htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              className="admin-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Digite sua senha"
            />
          </div>

          {error && <div className="admin-error">{error}</div>}

          <button 
            type="submit" 
            className="admin-btn"
            disabled={isLoading}
          >
            {isLoading ? <div className="admin-spinner"></div> : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
