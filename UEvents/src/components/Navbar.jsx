import React, { useContext, useEffect, useState } from 'react';
import logo1 from "../assets/images/logo.png";
import arrow1 from "../assets/images/Arrow.png";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

function Navbar({ showOnlyLogo }) {
  const [username, setUsername] = useState(null);
  const { user, setUser, logout } = useContext(UserContext)

  useEffect(() => {
    const loggedInUser = localStorage.getItem("username");
    if (loggedInUser) {
      setUsername(loggedInUser);
    }
  }, []);

  const handleLogout = async () => {

    // localStorage.removeItem("username");
    // setUsername(null);
    await logout()
    setUser({ ...user, isLoggedIn: false, username: "" })
  };

  const navigate = useNavigate()

  return (
    <>
      <nav className="navbar">
        {showOnlyLogo === true ?
          <>
            <div className="logo" data-aos="fade-up" data-aos-duration="800">
              <img src={logo1} className="logou" alt="" onClick={() => navigate("/")} />
            </div>
          </>
          :
          <>
            <div className="logo" data-aos="fade-up" data-aos-duration="800">
              <img src={logo1} className="logou" alt="" />
            </div>
            <ul className="nav-links" data-aos="fade-up" data-aos-duration="800" data-aos-delay="500">
              <li><Link to="/">Home</Link></li>
              <li><a href="#mainabout">About</a></li>
              <li><a href="#mainorganizers">Organizers</a></li>
              <li><a href="#mainjoinus">Join Us</a></li>
              <li><a href="#events">Events</a></li>
            </ul>

            {user.isLoggedIn ? (
              <div className="user-controls">
                <span className="spantext">Hi, {user.username}</span>
                <button className="login-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login">
                <button className="login-btn" data-aos="fade-up" data-aos-duration="800" data-aos-delay="1000">
                  Login <img src={arrow1} alt="" />
                </button>
              </Link>
            )}
          </>
        }


      </nav>
    </>
  );
}

export default Navbar;