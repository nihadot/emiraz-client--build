import React, { useEffect } from 'react'
import AgencyLogin from "../components/Agency/Agency"
import { AGENCY_ID, AGENCY_TOKEN } from '../api/localstorage-varibles';
import { useNavigate } from 'react-router-dom';

function AgencyLoginPage() {

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(AGENCY_ID) && localStorage.getItem(AGENCY_TOKEN)) {
      navigate('/agency-dashboard');
    }
  }, [navigate]);


  return (
    <div className='min-h-screen flex justify-center items-center'>

      <AgencyLogin/>
    </div>
  )
}

export default AgencyLoginPage