import { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../UserContext';
import { useNavigate } from 'react-router-dom';

const api = process.env.REACT_APP_API_URL;

function Logout() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post(`${api}/api/auth/logout`, {}, { withCredentials: true });
        setUser(null);
        setTimeout(() => navigate('/'), 1000); // ⏳ Wait 1 second before navigating
      } catch (error) {
        console.error('Logout failed:', error);
        navigate('/');
      }
    };
    logout();
  }, [navigate, setUser]);

  return (
    <div style={{ textAlign: 'center', paddingTop: '50px' }}>
      <i className="fas fa-spinner fa-spin" style={{ fontSize: '24px', color: 'gray' }}></i>
      <p>Logging out...</p>
    </div>
  );
}

export default Logout;