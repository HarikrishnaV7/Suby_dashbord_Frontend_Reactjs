import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';

const Login = ({ welcomehandler, registerhandler }) => {
  const containerStyle = {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4'
  };

  const formStyle = {
    width: '360px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '-300px',
    marginLeft: '400px'
  };

  const inputStyle = {
    padding: '6px 10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '0.9rem'
  };

  const buttonStyle = {
    padding: '8px',
    backgroundColor: '#007acc',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '10px'
  };

  const textStyle = {
    textAlign: 'center',
    marginTop: '10px',
    fontSize: '0.9rem'
  };

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const loginhandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}vendor/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        alert('Login Successful');
        setemail("");
        setpassword("");
        localStorage.setItem('loginToken', data.token);
        welcomehandler();
      }

      const vendorId = data.vendorId;
      const vendorResponse = await fetch(`${API_URL}vendor/single-vendor/${vendorId}`);
      const vendorData = await vendorResponse.json();
      if (vendorResponse.ok) {
        const vendorFirmId = vendorData.vendorFirmId;
        const vendorFirmName = vendorData.vendor.firm[0].firmName;
        localStorage.setItem('firmId', vendorFirmId);
        localStorage.setItem('firmName', vendorFirmName);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={loginhandler}>
        <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Vendor Login</h3>

        <label>Email</label>
        <input
          type="text"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          name="email"
          style={inputStyle}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your Password"
          onChange={(e) => setpassword(e.target.value)}
          value={password}
          name="password"
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>Login</button>

        <div style={textStyle}>
          Don't have an account?{' '}
          <span
            onClick={registerhandler}
            style={{ color: '#007acc', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Register
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
