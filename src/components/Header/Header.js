import '../../formstyle/formstyle.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className='header'>
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
        <Link to="/login" id="login/signup">{isMobile && isOpen && <i className='far fa-user'></i>} Login / Signup</Link>
      </nav>
    </header>
  );
}

export default Header;