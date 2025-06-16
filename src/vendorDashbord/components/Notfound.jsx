import React from 'react';
import { Link } from 'react-router-dom';

const Notfound = () => {
  const containerStyle = {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif'
  };

  const errorCodeStyle = {
    fontSize: '6rem',
    fontWeight: 'bold',
    color: '#ff4d4f',
    margin: '0'
  };

  const messageStyle = {
    fontSize: '1.5rem',
    margin: '10px 0'
  };

  const linkStyle = {
    marginTop: '20px',
    textDecoration: 'none',
    color: '#007bff',
    fontWeight: 'bold'
  };

  return (
    <div style={containerStyle}>
      <h1 style={errorCodeStyle}>404</h1>
      <p style={messageStyle}>Page Not Found</p>
      <Link to="/" style={linkStyle}>← Go back to Home</Link>
    </div>
  );
};

export default Notfound;
