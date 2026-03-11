import React, { useState } from 'react';
import api from '../api/axiosConfig';


const ReportForm: React.FC = () => {
    const [category, setCategory] = useState('');
    const [urgency, setUrgency] = useState<'low' | 'medium' | 'high'>('low');
    const [message, setMessage] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus(null);

        const formData = new FormData();
        formData.append('category', category);
        formData.append('urgency', urgency);
        formData.append('message', message);
        if (file) formData.append('image', file);

        try {
            await api.post('/reports', formData);
            setStatus({ type: 'success', msg: 'Report submitted successfully!' });
    
            setCategory(''); 
            setMessage(''); 
            setFile(null);
            setUrgency('low');
        } catch (error) {
            setStatus({ type: 'error', msg: 'Failed to submit report. Please try again.' });
        }
    };

    return (
        <div className="report-container">
            <h2 className="report-title">New Incident Report</h2>
            
            {status && (
                <div className={`status-message ${status.type === 'success' ? 'status-success' : 'status-error'}`}>
                    {status.msg}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Category</label>
                    <input 
                        type="text" 
                        className="input-underline"
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)} 

                        required 
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Urgency Level</label>
                    <select 
                        className="input-field"
                        value={urgency} 
                       onChange={(e) => setUrgency(e.target.value as 'low' | 'medium' | 'high')}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Message / Description</label>
                    <textarea 
                        className="input-field"
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        placeholder="Describe the issue in detail..."
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Attachment</label>
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                    />
                </div>

                <button type="submit" className="submit-btn">
                    Submit Report
                </button>
            </form>
        </div>
    );
};

export default ReportForm;