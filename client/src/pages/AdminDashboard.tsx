import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const AdminDashboard = () => {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user);
 
  return (
    <div className='admin-container'>
      <h1>Admin space</h1>
      <p>Welcome, <strong>{user?.fullName}</strong> </p>
       <div className='btn-admin'>
        <button onClick={() => navigate('/users')}>Agents</button>
         <button onClick={() => navigate('/all-reports')}>Reports</button>

      

       </div>
    </div>
  );
};

export default AdminDashboard;