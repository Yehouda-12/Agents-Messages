import { useNavigate } from 'react-router-dom';

const NotAdmin = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '5rem', fontFamily: 'sans-serif' }}>
      <div style={{ fontSize: '6rem' }}>😂</div>
      <h1 style={{ fontSize: '2rem', marginTop: '1rem' }}>You ? Admin ? LOL</h1>
      <p style={{ color: '#6b7280', fontSize: '1rem' }}>
        Did you really think you'd get in there ?
      </p>
      <p style={{ fontSize: '2rem' }}>🚨🚨🚨</p>
      <p style={{ color: '#6b7280' }}>Go back to your reports, agent.</p>
      <button
        onClick={() => navigate('/dashboard-agent')}
        style={{ marginTop: '2rem', padding: '0.6rem 1.5rem', cursor: 'pointer', fontSize: '1rem' }}
      >
        Go back quietly 🐣
      </button>
    </div>
  );
};

export default NotAdmin;