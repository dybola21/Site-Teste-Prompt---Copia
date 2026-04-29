import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Public/Home';
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import Leads from './pages/Admin/Leads';
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Rota Pública */}
        <Route path="/" element={<Home />} />
        
        {/* Rota de Login do Admin */}
        <Route path="/admin/login" element={<Login />} />
        
        {/* Rotas Administrativas Protegidas */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* Redireciona /admin para /admin/dashboard */}
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          <Route path="leads" element={<Leads />} />
          
          {/* Rotas exclusivas de admin */}
          <Route path="servicos" element={
            <ProtectedRoute requireAdmin={true}>
              <div>Tela de Serviços em construção</div>
            </ProtectedRoute>
          } />
          <Route path="depoimentos" element={
            <ProtectedRoute requireAdmin={true}>
              <div>Tela de Depoimentos em construção</div>
            </ProtectedRoute>
          } />
          <Route path="usuarios" element={
            <ProtectedRoute requireAdmin={true}>
              <div>Tela de Usuários em construção</div>
            </ProtectedRoute>
          } />
          <Route path="configuracoes" element={
            <ProtectedRoute requireAdmin={true}>
              <div>Tela de Configurações em construção</div>
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
