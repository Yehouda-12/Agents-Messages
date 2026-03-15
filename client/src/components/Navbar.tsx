import type { JSX } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import type { AuthState, User } from '../store/authStore'



const Navbar = (): JSX.Element | null => {
  const user = useAuthStore((state): User | null => state.user)
  const logout = useAuthStore((state): AuthState['logout'] => state.logout)
  const navigate = useNavigate()

  const handleLogout = (): void => {
    logout()
    navigate('/login')
  }

  if (!user) return null

  return (
    <nav className="navbar">
      <div>
        <strong>Agent Reports</strong>
      </div>

      <div>
        <span>Agent: {user.fullName}</span>

        <div className="btn-navbar">
          <button onClick={() => navigate('/dashboard-agent')}>Dashboard</button>
          <button onClick={handleLogout}>Exit</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar