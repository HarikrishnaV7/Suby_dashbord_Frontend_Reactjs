import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';
import { Link } from 'react-router-dom'; 

const Register = ({ loginhandler }) => {
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
    marginLeft: '400px',
    marginTop: '-300px'
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
    fontSize: '14px',
    marginTop: '10px',
    color: '#555'
  };

  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}vendor/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setusername("");
        setemail("");
        setpassword("");
        alert("Vendor registered successfully");
        loginhandler();
      }
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed");
    }
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Vendor Register</h3>

        <label>Username</label>
        <input
          type="text"
          placeholder="Enter your Name"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          name="username"
          style={inputStyle}
        />

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
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          name="password"
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>Submit</button>

        <div style={textStyle}>
          Already have an account?{" "}
          <span onClick={loginhandler}style={{ color: '#007acc', cursor: 'pointer', textDecoration: 'underline' }} >Login</span>

        </div>
      </form>
    </div>
  );
};

export default Register;
