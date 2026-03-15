
import type { JSX } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import type { User } from '../store/authStore'

const AgentDashboard = (): JSX.Element | null => {
  const user = useAuthStore((state): User | null => state.user)
  const navigate = useNavigate()

  if (!user) return null

  return (
    <div className="btn-agent">
      <button onClick={() => navigate('/my-reports')}>My Reports</button>
      <button onClick={() => navigate('/new-report')}>+ New Report</button>
      <button onClick={() => navigate('/new-report-CSV')}>+ IMPORT CSV</button>
      {user.role === 'admin' && (
        <button onClick={() => navigate('/admin-dashboard')}>Admin Dashboard</button>
      )}
    </div>
  )
}

export default AgentDashboard