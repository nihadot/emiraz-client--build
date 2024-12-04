import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
  <div className="">
    {/* <Header/> */}
      <div
      style={{
        backgroundColor: '#fff', // Black background
        color: '#000', // White text
        height: '100vh', // Full screen height
        display: 'flex', // Center content
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
        Page Not Found
      </p>
      <button
        onClick={() => navigate('/')} // Navigate to home page
        style={{
          backgroundColor: '#000', // White background
          color: '#fff', // Black text
          border: 'none',
          padding: '10px 20px',
          fontSize: '1rem',
          cursor: 'pointer',
          borderRadius: '5px',
        }}
      >
        Return to Home Page
      </button>

      
    </div>

    <Footer/>
  </div>
  );
};

export default NotFoundPage;




function Header() {
  return (
    <div className='h-[100px] font-medium bg-black text-white flex justify-center gap-4 items-center'>
        <label htmlFor="">Home</label>
        <label htmlFor="">About Us</label>
        <label htmlFor="">Blog</label>
        <label htmlFor="">Villa</label>
        <label htmlFor="">Apartment</label>
        <label htmlFor="">Penthouse</label>
        <label htmlFor="">Townhouse</label>
    </div>
  )
}
