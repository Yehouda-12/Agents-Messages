import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig'; 
import { useAuthStore } from '../store/authStore'; 

const LoginPage : React.FC = ()=>{
    const [agentCode, setAgentCode] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate()

    const setAuth = useAuthStore((state)=>state.setAuth)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
    try {
        const response = await api.post('/auth/login',{ 
                agentCode, 
                password 
            });
        const {token,user} = response.data

        setAuth(user,token)

        navigate("/dashboard-agent")
    
        
    } catch (err: any) {
           
            setError(err.response?.data?.message || 'Erreur de connexion');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className='login-container'>
            <div className="login-card">
                <form onSubmit={handleSubmit}>
                    <h2>Agents</h2>
                    {error && <div className="error-msg">{error}</div>}

                    <div className="form-group">
                        <label>Code Agent</label>
                        <input 
                            type="text" 
                            value={agentCode}
                            onChange={(e) => setAgentCode(e.target.value)}
                            placeholder="Ex: ADMIN01"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'Vérification...' : 'Login'}
                    </button>
                </form>
            </div>

        </div>
    )
}
export default LoginPage