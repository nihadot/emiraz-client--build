import { useEffect } from 'react'
import Layout from '../components/Agency/Layout'
import { useNavigate } from 'react-router-dom';
import { AGENCY_ID, AGENCY_TOKEN } from '../api/localstorage-varibles';

function AdminLayout() {

  const navigate = useNavigate();

  useEffect(() => {
    if (!(localStorage.getItem(AGENCY_TOKEN) && localStorage.getItem(AGENCY_ID))) {
      navigate('/agent-login');
    }
  }, [navigate]);

  return (
    <div className=''>
        { localStorage.getItem(AGENCY_TOKEN) && localStorage.getItem(AGENCY_ID) ? <Layout/> : navigate('/agent-login')}
    </div>
  )
}

export default AdminLayout