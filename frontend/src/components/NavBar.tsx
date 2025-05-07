import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        ♠ Poker Logger
      </div>

      <button className={styles.hamburger} onClick={toggleMenu}>
        ☰
      </button>

      <ul className={`${styles.navLinks} ${isOpen ? styles.open : ''}`}>
        <li>
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        </li>
        <li>
          <Link to="/groups" onClick={() => setIsOpen(false)}>Groups</Link>
        </li>
        <li>
          <Link to="/players" onClick={() => setIsOpen(false)}>Players</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
