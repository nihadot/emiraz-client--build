import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ID, ADMIN_TOKEN } from '../api/localstorage-varibles';
import axios from 'axios';
import { SERVER_URL } from '../api';
import { toLoadClosedEnquiriesCount } from '../features/closedSlice';

function AdminLayout() {

  const { isAuthenticated } = useSelector((state) => state.auth); 

  const navigate = useNavigate();

  useEffect(() => {
    if (!(localStorage.getItem(ADMIN_ID) && localStorage.getItem(ADMIN_TOKEN))) {
      navigate('/admin-login');
    }
  }, [navigate]);

  const dispatch = useDispatch();


  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/property/property-closed-status/`, {
              headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
            });
         

    const totalUnreadCount = response?.data?.result?.length > 0 && response?.data?.result?.reduce((accumulator,currentValue)=> accumulator+(!currentValue.view ? 1 : 0)  ,0 )
dispatch(toLoadClosedEnquiriesCount(totalUnreadCount));

          } catch (error) {
            throw error || "An error occurred during login.";
          }
    };

    fetchData();
  }, []);




  return (
    <div className=''>
        { isAuthenticated ? <Layout/> : navigate('/admin-login')}
    </div>
  )
}

export default AdminLayout