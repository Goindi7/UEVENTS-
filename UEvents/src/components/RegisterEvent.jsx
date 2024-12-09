import React, { useState, useEffect, useRef, useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
import Navbar from './Navbar';
import { UserContext } from '../contexts/UserContext';

const RegisterEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [progress, setProgress] = useState(0);

  const { user } = useContext(UserContext)

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4003/event/${eventId}`, {
          withCredentials: true
        });
        if (response.data.success) {
          setEvent(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
        alert('Failed to load event details');
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);

  useEffect(() => {
    let interval;
    if (registering && progress < 90) {
      interval = setInterval(() => {
        setProgress(prev => {
          const increment = Math.random() * 15;
          const newProgress = prev + increment;
          return newProgress > 90 ? 90 : newProgress;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [registering]);

  const handleRegister = async () => {
    try {
      if (!user.isLoggedIn) {
        alert("Please login first to register for the event")
        return
      }
      setRegistering(true);
      // Demo token - in real app, get this from your auth system
      const demoUserToken = "user123";

      const response = await axios.post(`http://localhost:4003/event/register/${eventId}`, {}, {
        withCredentials: true
      });

      setProgress(100);
      setTimeout(() => {
        setEvent(prevEvent => ({
          ...prevEvent,
          isRegistered: true
        }));

        alert(response.data.message || 'Successfully registered for event!');
        // navigate('/');
      }, 500);

    } catch (error) {
      alert('Registration failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setRegistering(false);
      setProgress(0);
    }
  };

  if (loading) {
    return <div>Loading event details...</div>;
  }

  if (!event) {
    return <div>Event not found</div>;
  }


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      if (!recapchaValue) {
        alert('Please verify that you are not a robot');
        return;
      }
      // setFormData({ ...formData, captchaToken: recapchaValue })
      const response = await axios.post('http://localhost:4003/register-event', {
        ...formData,
        captchaToken: recapchaValue
      });
      // captchaRef.current.reset()
      alert(response.data.msg);
      navigate("/")

    } catch (error) {
      alert('Registration failed! ' + error.response?.data?.msg || error.message);
    }
    captchaRef.current.reset()
  };

  const onChange = (code) => {
    setRecapchaValue(code)
  }

  return (
    <>
      <div className="outerhero">
        <Navbar data-aos="fade-up" data-aos-duration="3000" showOnlyLogo={true} />


      </div>
      <div className="registereventout">
        <div className="event-details-container" style={styles.container}>
          {registering && (
            <div style={styles.progressBarContainer}>
              <div style={{
                ...styles.progressBar,
                width: `${progress}%`
              }} />
              <div style={styles.progressText}>
                Registering for event... {Math.round(progress)}%
              </div>
            </div>
          )}
          <div className="event-content" style={styles.content}>
            <div className="event-image-container" style={styles.imageContainer}>
              <img
                src={event.poster}
                alt={event.title}
                style={styles.image}
              />
            </div>

            <div className="event-info" style={styles.info}>
              <h1 className="event-title" style={styles.title}>
                {event.title} <span style={styles.titleSpan}>Event</span>
              </h1>

              <div className="event-date" style={styles.date}>
                <strong>Date: </strong>
                {new Date(event.eventDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>

              <div className="event-description" style={styles.description}>
                <strong>Description: </strong>
                <div style={styles.descriptionText}>{event.desc}</div>
              </div>

              <div className="event-organizer" style={styles.organizer}>
                <strong>Organized by: </strong>
                {event.organizer}
              </div>

              <button
                onClick={handleRegister}
                className="registerButton"
                style={{
                  ...styles.button,
                  opacity: registering || event.isRegistered ? 0.7 : 1,
                  cursor: registering || event.isRegistered ? 'not-allowed' : 'pointer',
                  backgroundColor: event.isRegistered ? '#28a745' : '#ff4444'
                }}
                disabled={registering || event.isRegistered}
              >
                {registering ? 'Registering...' :
                  event.isRegistered ? 'Already Registered' :
                    'Register for Event'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    minHeight: '80vh',
  },
  content: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  imageContainer: {
    flex: '1',
    minWidth: '300px',
    maxWidth: '500px',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  info: {
    flex: '1',
    minWidth: '300px',
    padding: '1rem',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '1.5rem',
    color: '#000',
    fontWeight: 'bold',
  },
  titleSpan: {
    color: '#ff4444',
  },
  date: {
    fontSize: '1.2rem',
    color: '#000',
    marginBottom: '1.5rem',
    fontWeight: '500',
  },
  description: {
    marginBottom: '2rem',
    color: '#000',
  },
  descriptionText: {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    marginTop: '0.5rem',
    color: '#222',
  },
  organizer: {
    fontSize: '1.1rem',
    color: '#000',
    marginBottom: '2rem',
  },
  button: {
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    backgroundColor: '#ff4444',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontWeight: '500',
  },
  loadingText: {
    fontSize: '1.2rem',
    color: '#000',
    textAlign: 'center',
    padding: '2rem',
  },
  errorText: {
    fontSize: '1.2rem',
    color: '#ff4444',
    textAlign: 'center',
    padding: '2rem',
  },
  progressBarContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '4px',
    backgroundColor: '#f0f0f0',
    zIndex: 1000
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#ff4444',
    transition: 'width 0.3s ease-in-out'
  },
  progressText: {
    position: 'absolute',
    top: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    color: '#000',
    fontSize: '14px',
    fontWeight: '500'
  }
};

export default RegisterEvent;