// src/pages/ForgotPassword.js
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const api = process.env.REACT_APP_API_URL;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${api}/api/auth/forgot-password`, { email });
    setToken(res.data.token);
  };

  return (
    <div className='top'>
        <form className='form'>
      <h2 className='h'>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        
        <input className='input' onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
        <div className='subdiv'>
        <button type="submit">Send Reset Link</button>
        </div>
      </form>
      {token && <p>Mock Reset Token: {token}</p>}
      <div className="adiv">
        <Link to="/login" className="a">Back</Link>
      </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
