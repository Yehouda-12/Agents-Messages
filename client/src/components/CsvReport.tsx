import React, { useState } from 'react';
import api from '../api/axiosConfig';


const CsvReport: React.FC = () => {
   
    
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus(null);

        const formData = new FormData();
      
        if (file) formData.append('file', file);

        try {
            await api.post('/reports/csv', formData);
            setStatus({ type: 'success', msg: 'Report submitted successfully!' });
    
          
            setFile(null);
           
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
                    <label className="form-label">Attachment</label>
                    <input 
                        type="file" 
                        
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

export default CsvReport;