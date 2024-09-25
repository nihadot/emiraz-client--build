import { useEffect } from 'react'
import Layout from '../components/Layout'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ID, ADMIN_TOKEN } from '../api/localstorage-varibles';

function AdminLayout() {

  const { isAuthenticated } = useSelector((state) => state.auth); 

  const navigate = useNavigate();

  useEffect(() => {
    if (!(localStorage.getItem(ADMIN_ID) && localStorage.getItem(ADMIN_TOKEN))) {
      navigate('/admin-login');
    }
  }, [navigate]);

  return (
    <div className=''>
        { isAuthenticated ? <Layout/> : navigate('/admin-login')}
    </div>
  )
}

export default AdminLayout