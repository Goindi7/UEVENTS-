import React, { useContext, useEffect, useState } from 'react';
import logo1 from "../assets/images/logo.png";
import arrow1 from "../assets/images/Arrow.png";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { AdminContext } from '../contexts/AdminContext';

function AdminNavbar({ showOnlyLogo }) {
  const [username, setUsername] = useState(null);
  const { admin, setAdmin, adminLogout } = useContext(AdminContext)

  useEffect(() => {
    const loggedInUser = localStorage.getItem("username");
    if (loggedInUser) {
      setUsername(loggedInUser);
    }
  }, []);

  const handleLogout = async () => {

    //   // localStorage.removeItem("username");
    //   // setUsername(null);
    await adminLogout()
    setAdmin({ ...admin, isLoggedIn: false, username: "" })
    navigate("/admin")
    //   setUser({ ...user, isLoggedIn: false, username: "" })
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
              <li className='active'><Link to="/admin/events" className='active'>Events</Link></li>
              <li><Link to="/admin/add-event">Add Event</Link></li>
              <li><Link to="/admin/event-registrations">View Users</Link></li>
              {/* <li><a href="#mainjoinus">Join Us</a></li>
              <li><a href="#events">Events</a></li> */}
            </ul>

            {admin.isLoggedIn ? (
              <div className="user-controls">
                <span className="spantext">Hi, {admin.username}</span>
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

export default AdminNavbar;