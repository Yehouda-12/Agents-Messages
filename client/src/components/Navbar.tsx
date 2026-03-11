import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = ():void => {
    logout();
    navigate('/login'); 
  };

  if (!user) return null; 

  return (
    <nav className='navbar'>
      <div>
        <strong>Agent Reports</strong> 
      </div>
      
      <div>
        <span >Agent: {user.fullName}</span>
        
<div className='btn-navbar' >
    <button onClick={() =>  navigate("/dashboard-agent")}>Dashboard</button>

    <button onClick={handleLogout}>Exit</button>
</div>
      </div>
    </nav>
  );
};

export default Navbar;