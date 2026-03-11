import { BrowserRouter , Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';


import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import AgentDashboard from './pages/AgentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ReportForm from './components/ReportForm';
import MyReports from './components/MyReports';
import CsvReport from './components/CsvReport';
import AdminUsers from './components/AdminUsers';
import AdminReports from './components/AdminReports';
import './App.css'


const PrivateRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};


const AdminRoute = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  if (!user) return <Navigate to="/login" />;
  if (user.role !== 'admin') return <Navigate to="/dashboard-agent" />;
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

 
        <Route path="/login" element={<LoginPage />} />

      
        <Route path="/dashboard-agent" element={<PrivateRoute><AgentDashboard /></PrivateRoute>} />
        <Route path="/my-reports"      element={<PrivateRoute><MyReports /></PrivateRoute>} />
        <Route path="/new-report"      element={<PrivateRoute><ReportForm /></PrivateRoute>} />
        <Route path="/new-report-CSV"  element={<PrivateRoute><CsvReport /></PrivateRoute>} />

    
        <Route path="/admin-dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/users"           element={<AdminRoute><AdminUsers /></AdminRoute>} />
        <Route path="/all-reports"     element={<AdminRoute><AdminReports /></AdminRoute>} />

       
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;