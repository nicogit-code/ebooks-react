import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import Logo from '../images/logo2.png';
// import GoTBooks from '../got/GoTBooks';

import styles from './Header.module.css';

function Header() {
    const { user, setUser } = useContext(UserContext);
    const [query, setQuery] = useState('');
    const history = useHistory();
    let timeout = null;

    function handleLogout(e) {
      e.preventDefault();

      setUser(null);
      localStorage.removeItem('user');
    }

    function handleInputChange(e) {
      if(timeout) {
        clearTimeout(timeout);
      }
      const value = e.currentTarget.value;
      setQuery(value);
      timeout = setTimeout(() => history.push('/?q=' + value), 300);
    }

    return(
      <nav className={styles.navBar}>

        <img className={ styles.navLogo } src={Logo} alt="logo" width={180} height={100} />
          
        <div className={styles.siteNav}>
          <ul>
            <li className={styles.active}><a href="/">Home</a></li>
            {/* <li><a href="#0">Despre</a></li> */}
            {/* <li><a href="#0">Contact</a></li> */}
            <li><a href="/game-of-thrones">GoT Lovers only</a></li>
          </ul>
        </div>
          
        <div className={styles.actions}>
          <div className={styles.siteNav}>
            <ul>
              <li>
                {/* <form className="searchBar"> */}
                <input className={styles.searchBar}
                  onChange = { handleInputChange }
                  value={ query }
                  type="text"
                  placeholder="Caută o carte" >
                </input>
              {/* </form> */}
              </li>

              <li>
                {( user ?
                  <>
                    <Link className={styles.active} to="/profile">
                      Welcome, { user.username }
                    </Link>
                    <a href="/" className={styles.active} onClick={ handleLogout }>Logout</a>
                  </>
                  :
                  <>
                    <Link className={styles.active} to="/login">
                      Login
                    </Link>
                    <Link className={styles.active} to="/register">
                      Register
                    </Link>
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>

      </nav>
    );
}

export default Header;

