import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import styles from '../../formstyle/formstyle.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Select Role');

  const [error, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  const nameRegex = /^[a-zA-Z0-9_]{3,16}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Validation handlers (same as before)
  const handleNameBlur = () => {
    if (!name.trim()) {
      setErrors((prev) => ({ ...prev, name: '*Required' }));
    } else if (!nameRegex.test(name)) {
      setErrors((prev) => ({
        ...prev,
        name: '*Invalid name. Only letters, underscore and numbers',
      }));
    } else {
      setErrors((prev) => ({ ...prev, name: '' }));
    }
  };

  const handlePhoneBlur = () => {
    if (!phone.trim()) {
      setErrors((prev) => ({ ...prev, phone: '*Required' }));
    } else if (!phoneRegex.test(phone)) {
      setErrors((prev) => ({ ...prev, phone: '*Invalid phone number' }));
    } else {
      setErrors((prev) => ({ ...prev, phone: '' }));
    }
  };

  const handleEmailBlur = () => {
    if (!email.trim()) {
      setErrors((prev) => ({ ...prev, email: '*Required' }));
    } else if (!emailRegex.test(email)) {
      setErrors((prev) => ({ ...prev, email: '*Invalid email address' }));
    } else {
      setErrors((prev) => ({ ...prev, email: '' }));
    }
  };

  const handlePasswordBlur = () => {
    if (!password.trim()) {
      setErrors((prev) => ({ ...prev, password: '*Required' }));
    } else if (!passwordRegex.test(password)) {
      setErrors((prev) => ({
        ...prev,
        password:
          '*Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.',
      }));
    } else {
      setErrors((prev) => ({ ...prev, password: '' }));
    }
  };

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedPhone = phone.trim();
  const trimmedPassword = password.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = {};

    // Validation checks
    if (!trimmedName) {
      formErrors.name = '*Required';
    } else if (!nameRegex.test(trimmedName)) {
      formErrors.name = '*Invalid name. Only letters, underscore and numbers';
    }

    if (!trimmedPhone) {
      formErrors.phone = '*Required';
    } else if (!phoneRegex.test(trimmedPhone)) {
      formErrors.phone = '*Invalid phone number';
    }

    if (!trimmedEmail) {
      formErrors.email = '*Required';
    } else if (!emailRegex.test(trimmedEmail)) {
      formErrors.email = '*Invalid email address';
    }

    if (!trimmedPassword) {
      formErrors.password = '*Required';
    } else if (!passwordRegex.test(trimmedPassword)) {
      formErrors.password =
        '*Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.';
    }

    if (role === 'Select Role') {
      formErrors.role = '*Please select a role';
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    // Prepare data for backend
    const registerData = {
      name: trimmedName,
      phone: trimmedPhone,
      email: trimmedEmail,
      password: trimmedPassword,
      role,
};


    try {
      await axios.post('http://localhost:5000/api/auth/register', registerData);
      alert('Successfully registered');
      // Clear form on success
      setName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setRole('Select Role');
      setErrors({});
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || 'Registration failed');
      } else {
        alert('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div>
      <div className='top'>
        <form className='form' onSubmit={handleSubmit}>
          <header className='h'>Register</header>

          {/* Name */}
          <div>
            <label>
              <i className='fas fa-user myIcon'></i>
            </label>
            <input
              className='input'
              type="text"
              value={name}
              placeholder="Username"
              onChange={(e) => setName(e.target.value)}
              onBlur={handleNameBlur}
            />
            {error.name && <p className='error'>{error.name}</p>}
          </div>

          {/* Phone */}
          <div>
            <i className='fas fa-phone myIcon'></i>
            <input
              type="text"
              value={phone}
              className='input'
              placeholder="123 456 7890"
              onChange={(e) => setPhone(e.target.value)}
              onBlur={handlePhoneBlur}
            />
            {error.phone && <p className='error'>{error.phone}</p>}
          </div>

          {/* Email */}
          <div>
            <i className='fas fa-envelope myIcon'></i>
            <input
              className='input'
              type="text"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleEmailBlur}
            />
            {error.email && <p className='error'>{error.email}</p>}
          </div>

          {/* Select Role */}
          <div className='selectdiv'>
            <div>
              <label className='label'>Role</label>
            </div>
            <div>
              <select
                className='select'
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Select Role">Select Role</option>
                <option value="Buyer">Buyer</option>
                <option value="Tenant">Tenant</option>
                <option value="Owner">Owner</option>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
                <option value="Content Creator">Content Creator</option>
              </select>
              {error.role && <p className='error'>{error.role}</p>}
            </div>
          </div>

          {/* Password */}
          <div className='passwordWrapper'>
            <i className='fas fa-lock myIcon'></i>
            <input
              className='input'
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handlePasswordBlur}
            />
            {error.password && <p className='error'>{error.password}</p>}
            <i
              className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} myIcon`}
              id='eye'
              onClick={() => setShowPassword((prev) => !prev)}
              style={{ cursor: 'pointer' }}
            ></i>
          </div>

          <div className='subdiv'>
            <button type="submit">Register</button>
          </div>

          <div className='adiv'>
            <Link to="/help" className='a'>
              Help?
            </Link>
            <Link to="/login" className='a'>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;