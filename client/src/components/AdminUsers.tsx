import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import api from '../api/axiosConfig';

interface NewAgentForm {
  fullName: string;
  agentCode: string;
  password: string;
  role: string;
}

const AdminUsers = () => {
  const users = useAuthStore((state) => state.users);
  const loading = useAuthStore((state) => state.loading);
  const fetchAllUsers = useAuthStore((state) => state.fetchAllUsers);

  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [tempPassword, setTempPassword] = useState('');
  const [form, setForm] = useState<NewAgentForm>({
    fullName: '',
    agentCode: '',
    password: '',
    role: 'agent',
  });

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError('');
    setSuccess('');
    if (!form.fullName || !form.agentCode) {
      setError('Full name and agent code are required.');
      return;
    }
    try {
      const res = await api.post('/admin/users', form);
      const data = res.data;
      setTempPassword(data.temporaryPassword || '');
      setSuccess(`Agent "${data.user.fullName}" created!`);
      setForm({ fullName: '', agentCode: '', password: '', role: 'agent' });
      setShowForm(false);
      fetchAllUsers();
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Something went wrong.');
    }
  };

  return (
    <div>
      <h2>Agents ({users.length})</h2>

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : '+ New Agent'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && (
        <p style={{ color: 'green' }}>
          {success} {tempPassword && <>— Temporary password: <strong>{tempPassword}</strong></>}
        </p>
      )}

      {showForm && (
        <div>
          <h3>Create Agent</h3>
          <div>
            <label>Full Name *</label><br />
            <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Jean Dupont" />
          </div>
          <div>
            <label>Agent Code *</label><br />
            <input name="agentCode" value={form.agentCode} onChange={handleChange} placeholder="AGT-042" />
          </div>
          <div>
            <label>Password (optional)</label><br />
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Auto-generated if empty" />
          </div>
          <div>
            <label>Role</label><br />
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="agent">Agent</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <br />
          <button onClick={handleSubmit}>Create Agent</button>
        </div>
      )}

      <hr />

      {loading && <p>Loading...</p>}

      {!loading && users.length === 0 && <p>No agents found.</p>}

      {!loading && users.length > 0 && (
        <table border={1} cellPadding={8}>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Agent Code</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((agent) => (
              <tr key={agent.id}>
                <td>{agent.fullName}</td>
                <td>{agent.agentCode}</td>
                <td>{agent.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsers;