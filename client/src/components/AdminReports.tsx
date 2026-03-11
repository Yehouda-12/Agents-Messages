import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import type { Report } from '../store/authStore'

const AdminReports = () => {
    const reports = useAuthStore((state) => state.reports);
    const loading = useAuthStore((state) => state.loading);
    const fetchReports = useAuthStore((state) => state.fetchReports);
    const fetchReportById = useAuthStore((state) => state.fetchReportById);

    const [filters, setFilters] = useState({
        agentCode: '',
        category: '',
        urgency: '',
    });

    const [searchId, setSearchId] = useState('');
    const [reportById, setReportById] = useState<Report | null>(null);
    const [idError, setIdError] = useState('');

    useEffect(() => {
        fetchReports();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSearch = () => {
        const activeFilters = Object.fromEntries(
            Object.entries(filters).filter(([_, v]) => v !== '')
        );
        fetchReports(activeFilters);
    };

    const handleReset = () => {
        setFilters({ agentCode: '', category: '', urgency: '' });
        fetchReports();
    };

    const handleSearchById = async () => {
        setIdError('');
        setReportById(null);
        if (!searchId.trim()) {
            setIdError('Please enter an ID.');
            return;
        }
        try {
            const report = await fetchReportById(searchId.trim());
            setReportById(report);
        } catch (err: any) {
            setIdError(err.response?.data?.message || 'Report not found.');
        }
    };

    const handleResetById = () => {
        setSearchId('');
        setReportById(null);
        setIdError('');
    };

    return (
        <div>
            <h2>Reports ({reports.length})</h2>


            <div>
                <h4>Search by ID</h4>
                <input
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="Report ID"
                />
                <button onClick={handleSearchById}>Find</button>
                <button onClick={handleResetById}>Clear</button>

                {idError && <p style={{ color: 'red' }}>{idError}</p>}

                {reportById && (
                    <table className='reports-table'>
                        <thead>
                            <tr>
                                <th>Agent</th>
                                <th>Agent Code</th>
                                <th>Category</th>
                                <th>Urgency</th>
                                <th>Message</th>
                                <th>Date</th>
                                <th>ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{reportById.userId?.fullName || 'N/A'}</td>
                                <td>{reportById.userId?.agentCode || 'N/A'}</td>
                                <td>{reportById.category || '—'}</td>
                                <td>{reportById.urgency || '—'}</td>
                                <td>{reportById.message}</td>
                                <td>{new Date(reportById.createdAt).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit'
                                })}</td>

                            </tr>
                        </tbody>
                    </table>
                )}
            </div>

            <hr />

            <div>
                <h4>Filter reports</h4>
                <input
                    name="agentCode"
                    value={filters.agentCode}
                    onChange={handleChange}
                    placeholder="Agent code"
                />
                <input
                    name="category"
                    value={filters.category}
                    onChange={handleChange}
                    placeholder="Category"
                />
                <select name="urgency" value={filters.urgency} onChange={handleChange}>
                    <option value="">All urgencies</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <button onClick={handleSearch}>Search</button>
                <button onClick={handleReset}>Reset</button>
            </div>

            <hr />

            {loading && <p>Loading...</p>}

            {!loading && reports.length === 0 && <p>No reports found.</p>}

            {!loading && reports.length > 0 && (
                <table className='reports-table' >
                    <thead>
                        <tr>
                            <th>Agent</th>
                            <th>Agent Code</th>
                            <th>Category</th>
                            <th>Urgency</th>
                            <th>Message</th>
                            <th>Date</th>
                            <th>ID</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => (
                            <tr key={report._id}>
                                <td>{report.userId?.fullName || 'N/A'}</td>
                                <td>{report.userId?.agentCode || 'N/A'}</td>
                                <td>{report.category || '—'}</td>
                                <td>{report.urgency || '—'}</td>
                                <td>{report.message}</td>
                                <td>{new Date(report.createdAt).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit'
                                })}</td>
                                <td>{report._id}</td>
                                <td>{report?.imagePath || 'NO IMAGE'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminReports;