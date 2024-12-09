import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './Login.css';
import { UserContext } from '../contexts/UserContext';

function AdminLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext)

  function handleInput(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch('http://localhost:4003/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify(formData)
    });
    const data = await res.json();

    if (res.ok) {
      setUser({ ...user, isLoggedIn: true, username: data.username })
      alert("Successfully logged in!");
      // localStorage.setItem('username', formData.username);
      navigate('/admin/events');
    } else {
      alert(data.msg);
    }
  }

  return (
    <>
      <div className="outerhero">
        <Navbar data-aos="fade-up" data-aos-duration="3000" showOnlyLogo={true} />
      </div>
      <div className="logincontainer">
        <section className='banner loginbg'>
          <div className="loginsection">
            <div className="form-container" id="login-form">
              <h1 className='headlo'>Admin Login</h1>
              <form className='loginfo' onSubmit={handleSubmit}>
                <input type="text" id="username" placeholder='Username' className='logininput' name="username" required onChange={handleInput} />
                <input type="password" id="password" placeholder='Password' className='logininput' name="password" required onChange={handleInput} />
                <button className='loginbutton' type="submit">Login</button>
              </form>
              {/* <p className='loginp'>Don't have an account? <Link className='logina' to="/signup" id="signup-link">Sign up</Link></p> */}
            </div>
          </div>
        </section>
      </div>
      <section className='banner footer' style={{ padding: "20vh 0" }}></section>
    </>
  );
}

export default AdminLogin;