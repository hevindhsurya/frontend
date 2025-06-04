import '../../formstyle/formstyle.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className='header'>
      <div className='div'>
        <p className='p'>Logo</p>
      </div>
      <nav className='div' aria-label="Main navigation">
        <Link to="/" className='a'>
          Home
        </Link>
        <Link to="/services" className='a'>
          Services
        </Link>
        <Link to="/blog" className='a'>
          Blog
        </Link>
        <Link to="/contact" className='a'>
          Contact
        </Link>
        <Link to="/about" className='a'>
          About
        </Link>
        <Link to="/propertylisting" className='a'>
          Property Listing
        </Link>
      </nav>
    </header>
  );
}

export default Header;
