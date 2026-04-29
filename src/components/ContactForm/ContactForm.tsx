import { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    servicoInteresse: '',
    mensagem: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      setFormData({
        nome: '',
        telefone: '',
        servicoInteresse: '',
        mensagem: ''
      });
      
      // Reseta a mensagem de sucesso após 5 segundos
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section className="contact-section" id="contato">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-title">Fale Conosco</h2>
          <p className="contact-subtitle">
            Preencha o formulário abaixo e nossa equipe entrará em contato rapidamente pelo WhatsApp.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome" className="form-label">Nome Completo</label>
            <input
              type="text"
              id="nome"
              name="nome"
              className="form-input"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Digite seu nome"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefone" className="form-label">WhatsApp</label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              className="form-input"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="(XX) XXXXX-XXXX"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="servicoInteresse" className="form-label">Serviço de Interesse</label>
            <select
              id="servicoInteresse"
              name="servicoInteresse"
              className="form-select"
              value={formData.servicoInteresse}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Selecione um serviço</option>
              <option value="Emergência 24h">Emergência Odontológica 24h</option>
              <option value="Implantes">Implantes Dentários</option>
              <option value="Lentes de Contato">Lentes de Contato Dental</option>
              <option value="Ortodontia">Aparelhos Ortodônticos</option>
              <option value="Clínico Geral">Avaliação Geral</option>
              <option value="Outros">Outros Serviços</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="mensagem" className="form-label">Mensagem (Opcional)</label>
            <textarea
              id="mensagem"
              name="mensagem"
              className="form-textarea"
              value={formData.mensagem}
              onChange={handleChange}
              placeholder="Como podemos te ajudar hoje?"
            />
          </div>

          <button 
            type="submit" 
            className="contact-submit-btn"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Enviando...' : 'Enviar Mensagem'}
          </button>

          {status === 'success' && (
            <div className="form-status success">
              Mensagem enviada com sucesso! Retornaremos em breve.
            </div>
          )}

          {status === 'error' && (
            <div className="form-status error">
              Houve um erro ao enviar sua mensagem. Tente novamente ou use o botão do WhatsApp.
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
