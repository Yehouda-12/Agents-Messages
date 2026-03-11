import React, { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import type { Report } from '../store/authStore';


const MyReports = () => {
  const { reports, fetchReports, loading, user } = useAuthStore();

  useEffect(() => {
    fetchReports({ userId: user?._id });
  }, []);

  return (
    <div className="my-reports-page">
      <h2>My Reports</h2>

      {loading ? (
        <p>Loading reports...</p>
      ) : (
        <table className="reports-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Urgency</th>
              <th>Message</th>
              <th>Source</th>
              <th>Date</th>
              <th>Image Path</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report: Report) => (
              <tr key={report._id}>
                <td >{report._id}</td>
                <td>
                  <span >
                    {report.category || 'LOGISTICS'}
                  </span>
                </td>
                <td>
                  <span >
                    {report.urgency || 'MEDIUM'}
                  </span>
                </td>
                <td>{report.message}</td>
                <td>
                  <span>{report.sourceType || 'FORM'}</span>
                </td>
                <td >
                  {new Date(report.createdAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                </td>
                <td>
                  <span>{report.imagePath || "NO IMAGE"}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyReports;