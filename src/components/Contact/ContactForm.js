import axios from "axios";
import "../../formstyle/formstyle.css";
import { useState } from "react";
import ReCAPTCHA from 'react-google-recaptcha';

const SITE_KEY = '6LeEgWErAAAAADwWwELGP10pL4d_HRYmkK1TCAAG';

function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [topic, setTopic] = useState('Select Topic');
    const [message, setMessage] = useState('');

    const [error, setErrors] = useState({});

    const [captchaValue, setCaptchaValue] = useState(null);
    
    const handleCaptchaChange = (value) => {
      console.log("Captcha value:", value);
      setCaptchaValue(value);
    };

    const nameRegex = /^[a-zA-Z0-9_]{3,16}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^$|^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

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

  const handleEmailBlur = () => {
    if (!email.trim()) {
      setErrors((prev) => ({ ...prev, email: '*Required' }));
    } else if (!emailRegex.test(email)) {
      setErrors((prev) => ({ ...prev, email: '*Invalid email address' }));
    } else {
      setErrors((prev) => ({ ...prev, email: '' }));
    }
  };
   
  const handlePhoneBlur = () => {
    if (!phoneRegex.test(phone)) {
      setErrors((prev) => ({ ...prev, phone: '*Invalid phone number' }));
    } else {
      setErrors((prev) => ({ ...prev, phone: '' }));
    }
  };

  const handleMessageBlur = () => {
    if (!message.trim()) {
      setErrors((prev) => ({ ...prev, message: '*Required' }));
    } else {
      setErrors((prev) => ({ ...prev, message: '' }));
    }
  };
  
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedPhone = phone.trim();
  const trimmedMessage = message.trim();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaValue) {
      alert('Please verify that you are not a robot');
      return;
    }

    let formErrors = {};

    // Validation checks
    if (!trimmedName) {
      formErrors.name = '*Required';
    } else if (!nameRegex.test(trimmedName)) {
      formErrors.name = '*Invalid name. Only letters, underscore and numbers';
    }

    if (!phoneRegex.test(trimmedPhone)) {
      formErrors.phone = '*Invalid phone number';
    }

    if (!trimmedEmail) {
      formErrors.email = '*Required';
    } else if (!emailRegex.test(trimmedEmail)) {
      formErrors.email = '*Invalid email address';
    }

    if (topic === 'Select Topic') {
      formErrors.topic = '*Please select a topic';
    }

    if (!trimmedMessage) {
      formErrors.message = '*Required';
    } 

    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    // Prepare data for backend
    const queryData = {
      name: trimmedName,
      phone: trimmedPhone,
      email: trimmedEmail,
      topic: topic,
      message: trimmedMessage,
      recaptchaToken: captchaValue
    };
    try {
      await axios.post('https://backend-production-6241.up.railway.app/api/auth/contact', queryData);
      alert('Query submitted successfully');
      // Clear form on success
      setName('');
      setEmail('');
      setPhone('');
      setTopic('Select Topic');
      setMessage('');
      setErrors({});
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || 'Queru submission failed');
      } else {
        alert('An error occurred. Please try again later.');
      }
    }
  };

  return(
      <div>
        <form className="form" onSubmit={handleSubmit}>
            <h3 style={{ fontWeight:'600', fontSize:'22px'}}>Contact Us!</h3>
            {/* Name */}
            <div>
                <label>
                <i className='far fa-user myIcon'></i>
                </label>
                <input
                    className='input'
                    type="text"
                    value={name}
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    onBlur={handleNameBlur}
                />
                {error.name && <p className='error'>{error.name}</p>}
            </div>

            {/* Email */}
          <div>
            <i className='far fa-envelope myIcon'></i>
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

            {/* Phone */}
          <div>
            <i className='fas fa-phone myIcon'></i>
            <input
              type="text"
              value={phone}
              className='input'
              placeholder="123 456 7890 (optional)"
              onChange={(e) => setPhone(e.target.value)}
              onBlur={handlePhoneBlur}
            />
            {error.phone && <p className='error'>{error.phone}</p>}
          </div>

          {/* Select Topic */}
          <div className='selectdiv'>
            <div>
              <select
                className='select'
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              >
                <option value="Select Value">Select Value</option>
                <option value="Schedule a Visit">Schedule a Visit</option>
                <option value="Develop Website">Develop Website</option>
                <option value="Develop App">Develop App</option>
              </select>
              {error.topic && <p className='error'>{error.topic}</p>}
            </div>
          </div>

          {/* Message */}
          <div>
            <textarea 
              className="input" 
              id="message" 
              type="text" 
              rows="4" cols="50" 
              maxLength="150"
              placeholder="Type your message here..." 
              value={message}
              onBlur={handleMessageBlur}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            {error.message && <p className='error'>{error.message}</p>}
          </div>

          <ReCAPTCHA 
            className='recaptcha-container'
            theme='dark'
            sitekey={SITE_KEY}
            onChange={handleCaptchaChange}
            onExpired={() => setCaptchaValue('')}
          />

          <div className="subdiv">
            <button type="submit">Submit query</button>
          </div>
        </form>
      </div>
  );
}

export default ContactForm;