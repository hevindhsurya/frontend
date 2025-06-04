import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import '../../formstyle/formstyle.css'; // use your regular CSS file

function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const nameRegex = /^[a-zA-Z0-9_]{3,16}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleIdentifierBlur = () => {
    if (!identifier.trim()) {
      setErrors((prev) => ({ ...prev, identifier: '*Required' }));
    } else if (!emailRegex.test(identifier) && !nameRegex.test(identifier)) {
      setErrors((prev) => ({ ...prev, identifier: '*Invalid username or email address' }));
    } else {
      setErrors((prev) => ({ ...prev, identifier: '' }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedId = identifier.trim();
    const trimmedPassword = password.trim();
    let formErrors = {};

    if (!trimmedId) {
      formErrors.identifier = '*Required';
    } else if (!emailRegex.test(trimmedId) && !nameRegex.test(trimmedId)) {
      formErrors.identifier = '*Invalid username or email address';
    }

    if (!trimmedPassword) {
      formErrors.password = '*Required';
    } else if (!passwordRegex.test(trimmedPassword)) {
      formErrors.password =
        '*Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.';
    }

    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) return;

    const loginData = {
      identifier: trimmedId,
      password: trimmedPassword,
    };

    try {
      await axios.post('http://localhost:5000/api/auth/login', loginData, {
        withCredentials: true,
      });
      alert('Successfully logged in');
      setIdentifier('');
      setPassword('');
      setErrors({});
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        alert('Wrong credentials');
      } else {
        alert('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div>
      <div className="top">
        <form className="form" onSubmit={handleSubmit}>
          <header className="h">Login</header>

          {/* Username or Email field */}
          <div>
            <label>
              <i className="fas fa-user myIcon"></i>
            </label>
            <input
              className="input"
              type="text"
              value={identifier}
              placeholder="Username or Email"
              onChange={(e) => setIdentifier(e.target.value)}
              onBlur={handleIdentifierBlur}
            />
            {error.identifier && <p className="error">{error.identifier}</p>}
          </div>

          {/* Password */}
          <div className="passwordWrapper">
            <i className="fas fa-lock myIcon"></i>
            <input
              className="input"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handlePasswordBlur}
            />
            {error.password && <p className="error">{error.password}</p>}
            <i
              className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} myIcon`}
              id="eye"
              onClick={() => setShowPassword((prev) => !prev)}
              style={{ cursor: 'pointer' }}
            ></i>
          </div>

          <div className="subdiv">
            <button type="submit">Login</button>
          </div>

          <div className="adiv">
            <Link to="/forgetpassword" className="a">Forget password</Link>
            <Link to="/register" className="a">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
