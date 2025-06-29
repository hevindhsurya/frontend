import axios from "axios";
import "../../formstyle/formstyle.css";
import { useState } from "react";
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate } from 'react-router-dom';

const api = process.env.REACT_APP_API_URL;
const SITE_KEY = '6LeEgWErAAAAADwWwELGP10pL4d_HRYmkK1TCAAG';

function AddBlog() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [label, setLabel] = useState("Click here to upload file. (< 10MB)");
  const [error, setErrors] = useState({});
  const [captchaValue, setCaptchaValue] = useState(null);

  const navigate = useNavigate();

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const titleRegex = /^[A-Za-z0-9\s.,:;!?'"()\-]{5,100}$/;
  const authorRegex = /^[A-Za-z\s.'-]{2,50}$/;

  const handleTitleBlur = () => {
    if (!title.trim()) {
      setErrors((prev) => ({ ...prev, title: '*Required' }));
    } else if (!titleRegex.test(title)) {
      setErrors((prev) => ({ ...prev, title: '*Invalid title. Only letters, underscore and numbers' }));
    } else {
      setErrors((prev) => ({ ...prev, title: '' }));
    }
  };

  const handleAuthorBlur = () => {
    if (!author.trim()) {
      setErrors((prev) => ({ ...prev, author: '*Required' }));
    } else if (!authorRegex.test(author)) {
      setErrors((prev) => ({ ...prev, author: '*Invalid author name' }));
    } else {
      setErrors((prev) => ({ ...prev, author: '' }));
    }
  };

  const handleContentBlur = () => {
    if (!content.trim()) {
      setErrors((prev) => ({ ...prev, content: '*Required' }));
    } else {
      setErrors((prev) => ({ ...prev, content: '' }));
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    if (selectedFile) {
      const sizeInMB = (selectedFile.size / 1024 / 1024).toFixed(2);
      setLabel(`${selectedFile.name} (${sizeInMB} MB)`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaValue) {
      alert('Please verify that you are not a robot');
      return;
    }

    const trimmedTitle = title.trim();
    const trimmedAuthor = author.trim();
    const trimmedContent = content.trim();

    let formErrors = {};

    if (!trimmedTitle) {
      formErrors.title = '*Required';
    } else if (!titleRegex.test(trimmedTitle)) {
      formErrors.title = '*Invalid title. Only 5 to 100 characters, letters, spaces, common punctuations and numbers are allowed';
    }

    if (!trimmedAuthor) {
      formErrors.author = '*Required';
    } else if (!authorRegex.test(trimmedAuthor)) {
      formErrors.author = '*Invalid author name. 2 to 50 characters, letters, spaces, dots, apostrophes, and hyphens allowed.';
    }

    if (!trimmedContent) {
      formErrors.content = '*Required';
    }

    if (!image) {
      formErrors.image = '*Required';
    }

    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) return;
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('content', content);
    formData.append('image', image);
    formData.append('recaptchaToken', captchaValue);

    try {
      await axios.post(`${api}/api/auth/addblog`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Blog submitted successfully');
      navigate('/blogs'); 

      // Reset form
      setTitle('');
      setAuthor('');
      setContent('');
      setImage(null);
      setLabel("Click here to upload file. (< 2MB)");
      setErrors({});
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || 'Blog submission failed');
      } else {
        alert('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="addBlog">
      <form className="form" onSubmit={handleSubmit}>
        <h3 style={{ fontWeight: '600', fontSize: '22px' }}>Add Blog!</h3>

        {/* Title */}
        <div>
          <i className='far fa-user myIcon'></i>
          <input
            className='input'
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleBlur}
          />
          {error.title && <p className='error'>{error.title}</p>}
        </div>

        {/* Author */}
        <div>
          <i className='far fa-envelope myIcon'></i>
          <input
            className='input'
            type="text"
            value={author}
            placeholder="Author"
            onChange={(e) => setAuthor(e.target.value)}
            onBlur={handleAuthorBlur}
          />
          {error.author && <p className='error'>{error.author}</p>}
        </div>

        {/* Description */}
        <div>
          <textarea
            className="input"
            id="message"
            type="text"
            rows="4"
            cols="50"
            maxLength="5000"
            placeholder="Description"
            value={content}
            onBlur={handleContentBlur}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          {error.content && <p className='error'>{error.content}</p>}
        </div>

        {/* Image */}
        <div className="image">
          <i className='far fa-image myIcon'></i>
          <label className="custom-file-upload">
            {label}
            <input
              type="file"
              id="image"
              className='input'
              onChange={handleImageChange}
              accept="image/*"
              hidden
            />
          </label>
          {error.image && <p className='error'>{error.image}</p>}
        </div>

        <ReCAPTCHA
          className='recaptcha-container'
          theme='dark'
          sitekey={SITE_KEY}
          onChange={handleCaptchaChange}
          onExpired={() => setCaptchaValue('')}
        />

        <div className="subdiv">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AddBlog;