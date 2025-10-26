import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link 
        to="/" 
        className={location.pathname === '/' ? 'active' : ''}
      >
        Home
      </Link>
      <Link 
        to="/shop" 
        className={location.pathname === '/shop' ? 'active' : ''}
      >
        Shop
      </Link>
      <Link 
        to="/admin" 
        className={location.pathname === '/admin' ? 'active' : ''}
      >
        Admin Portal
      </Link>
    </nav>
  );
}

export default Navbar;