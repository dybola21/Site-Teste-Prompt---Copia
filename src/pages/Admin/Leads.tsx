import { useEffect, useState } from 'react';
import '../../styles/admin.css';

export interface Lead {
  id?: string;
  nome: string;
  telefone: string;
  servicoInteresse: string;
  mensagem: string;
  status: 'novo' | 'em_atendimento' | 'finalizado';
  createdAt?: any;
}

const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState<string | null>(null);

  const fetchLeads = async () => {
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      // Return empty array
      setLeads([]);
    } catch (error) {
      console.error("Erro ao carregar leads", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id: string, newStatus: Lead['status']) => {
    if (!id) return;
    setStatusUpdating(id);
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 500));
      setLeads(leads.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
    } catch (error) {
      alert("Erro ao atualizar o status.");
    } finally {
      setStatusUpdating(null);
    }
  };

  if (loading) {
    return <div className="admin-spinner large" style={{ marginTop: '3rem' }}></div>;
  }

  return (
    <div>
      <h1 className="admin-page-title">Gestão de Leads</h1>
      
      <div className="admin-card" style={{ padding: '0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)' }}>
              <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--admin-text-light)' }}>Nome</th>
              <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--admin-text-light)' }}>WhatsApp</th>
              <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--admin-text-light)' }}>Serviço</th>
              <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--admin-text-light)' }}>Mensagem</th>
              <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--admin-text-light)' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--admin-text-light)' }}>
                  Nenhum lead recebido ainda. (Modo de visualização)
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} style={{ borderBottom: '1px solid var(--admin-border)' }}>
                  <td style={{ padding: '1rem' }}>{lead.nome}</td>
                  <td style={{ padding: '1rem' }}>{lead.telefone}</td>
                  <td style={{ padding: '1rem' }}>{lead.servicoInteresse}</td>
                  <td style={{ padding: '1rem', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={lead.mensagem}>
                    {lead.mensagem}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <select 
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id!, e.target.value as Lead['status'])}
                      disabled={statusUpdating === lead.id}
                      style={{ 
                        padding: '0.5rem', 
                        borderRadius: '4px',
                        border: '1px solid var(--admin-border)',
                        backgroundColor: lead.status === 'novo' ? '#fef3c7' : lead.status === 'em_atendimento' ? '#dbeafe' : '#d1fae5',
                        color: lead.status === 'novo' ? '#92400e' : lead.status === 'em_atendimento' ? '#1e40af' : '#065f46',
                        fontWeight: '500'
                      }}
                    >
                      <option value="novo">Novo</option>
                      <option value="em_atendimento">Em Atendimento</option>
                      <option value="finalizado">Finalizado</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leads;
