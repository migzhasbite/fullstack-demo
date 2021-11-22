import { Link } from 'react-router-dom';

/**
 * The navbar gets should display, no matter if the user is logged in or out.
 *  - If the user is logged in, show the logged in user's metadata.
 *  - if the user isn't logged in, give a generic message with instructions.
 */
const Navbar = ({ user, hasFailedAuth }) => {
  return (
    <div className="navbar">
      <span className="logo">
        <Link className="link" to="/">
          Lama App
        </Link>
      </span>
      {user ? (
        <ul className="list">
          <li className="listItem">Welcome, {user.email}</li>
          <li>
            <Link className="link" to="dashboard">
              Dashboard
            </Link>
          </li>
          <Link className="link" to="Logout">
            Logout
          </Link>
        </ul>
      ) : (
        <ul className="list">
          <li className="listItem">
            <Link className="link" to="login">
              Login
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
