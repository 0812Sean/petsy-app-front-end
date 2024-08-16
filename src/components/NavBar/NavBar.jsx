import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import './NavBar.css';

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);
  return (
    <>
      {user ? (
        <nav>
          <div>
            <h1>Petsy</h1>
          </div>
          <div>
            <ul>
              {/* <p>Welcome, {user.username}</p> */}

              <li>
                <Link to="/">Dashboard</Link>
              </li>
              <li>
                <Link to="" onClick={handleSignout}>
                  Sign Out
                </Link>
              </li>
              <li>
                <Link to="/new">New Listing</Link>
              </li>
              <li>
                <Link to="/Marketplace">Marketplace</Link>
              </li>
            </ul>
          </div>
        </nav>
      ) : (
        <nav>
          <div>
            <h1>
              <Link to='/'>Petsy</Link>{' '}
            </h1>
          </div>
          <div>
            <ul>
              <li>
                <Link to="/signin">LOGIN</Link>
              </li>
              <li>
                <Link to="/signup" className="button-link">
                  GET STARTED
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </>
  );
};
export default NavBar;
