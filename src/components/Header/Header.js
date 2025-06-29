import '../../formstyle/formstyle.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../UserContext';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const { user } = useAuth();
  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <header className='header' ref={menuRef}>
      <div className='logo'>My Site</div>

      <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <nav className={`nav-links ${isOpen ? 'active' : ''}`}>
        <Link to="/">{isMobile && isOpen && <i className='fas fa-home'></i>} Home</Link>
        <Link to="/services">{isMobile && isOpen && <i className='fas fa-cogs'></i>} Services</Link>
        <Link to="/blog">{isMobile && isOpen && <i className='fas fa-blog'></i>} Blog</Link>
        <Link to="/contact">{isMobile && isOpen && <i className='far fa-envelope'></i>} Contact</Link>
        <Link to="/about">{isMobile && isOpen && <i className='fas fa-info'></i>} About</Link>
        <Link to="/propertyListing">{isMobile && isOpen && <i className='far fa-building'></i>} Property Listing</Link>
        <Link to="/addBlog">{isMobile && isOpen && <i className='far fa-plus'></i>} Add Blog</Link>
        {user ? (
          <Link
            to="/logout"
          >
            {isMobile && isOpen && <i className="far fa-user"></i>} Logout
          </Link>
        ) : (
          <Link to="/login" id="login/signup">
            {isMobile && isOpen && <i className="far fa-user"></i>} Login / Signup
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;