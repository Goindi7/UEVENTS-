import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import Navbar from './Navbar';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  function handleInput(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await fetch('http://localhost:4003/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.status === 201) { // If user creation is successful
        const data = await res.json();
        console.log(data);
        alert('User created successfully! Redirecting to login...');
        navigate('/login');
      } else if (res.status === 400) { // If user already exists
        const data = await res.json();
        alert(data.msg || 'User already exists.');
      } else {
        alert('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred during signup. Please try again later.');
    }
  }

  return (
    <>
      <div className="outerhero">
        <Navbar data-aos="fade-up" data-aos-duration="3000" />
      </div>

      <div className="logincontainer">
        <section className="banner loginbg">
          <div className="loginsection">
            <div className="form-container" id="login-form">
              <h1 className="headlo">Sign Up</h1>
              <form className="loginfo" onSubmit={handleSubmit}>
                <input
                  type="text"
                  id="new-username"
                  placeholder="Username"
                  className="logininput"
                  name="username"
                  onChange={handleInput}
                  required
                />
                <input
                  type="email"
                  id="new-email"
                  placeholder="Email"
                  className="logininput"
                  name="email"
                  onChange={handleInput}
                  required
                />
                <input
                  type="password"
                  id="new-password"
                  placeholder="Password"
                  className="logininput"
                  name="password"
                  onChange={handleInput}
                  required
                />
                {/* Start */}
                <input
                  type="text"
                  name="name"
                  onChange={handleInput}
                  className="logininput"
                  required
                  placeholder='Name'
                />

                {/* <input
                  type="email"
                  name="email"
                  onChange={handleInput}
                  className="logininput"
                  placeholder='Email'
                  required
                /> */}

                <input
                  type="tel"
                  name="phoneNumber"
                  onChange={handleInput}
                  className="logininput"
                  placeholder='Mobile Number'
                  required
                />

                <input
                  type="text"
                  name="rollNumber"
                  onChange={handleInput}
                  className="logininput"
                  placeholder='Roll Number'
                  required
                />

                <select
                  name="department"
                  onChange={handleInput}
                  className="registerSelect"
                  placeholder="Select Department"
                >
                  <option selected disabled value="0">Select Department</option>
                  <option value="CSE">CSE</option>
                  <option value="CSE-AI">CSE-AI</option>
                  <option value="Design">Design</option>
                  <option value="Civil">Civil</option>
                  <option value="Electrical">Electrical</option>
                  <option value="B Pharma">B Pharma</option>
                  <option value="Management">Management</option>
                </select>

                <input
                  type="text"
                  name="year"
                  onChange={handleInput}
                  className="logininput"
                  placeholder='Year'
                  required
                />


                {/* End */}
                <button className="loginbutton" type="submit">
                  Sign Up
                </button>
              </form>
              <p className="loginp">
                Already have an account?{' '}
                <Link className="logina" to="/login" id="signup-link">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className="banner footer" style={{ padding: '20vh 0' }}></section>
    </>
  );
}

export default Signup;
