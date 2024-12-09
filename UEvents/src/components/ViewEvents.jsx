import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../App.css';
import Loader from './Loader';
import AdminNavbar from './AdminNavbar';
import { AdminContext } from '../contexts/AdminContext';

const MainPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const { admin, setAdmin, adminLogout } = useContext(AdminContext)

    useEffect(() => {
        AOS.init();
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:4003/events');
            if (response.data.success) {
                setEvents([...response.data.data.pastEvents, ...response.data.data.upcomingEvents]);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
            alert('Failed to load events');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (eventId) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                setLoading(true);
                const response = await axios.delete(`http://localhost:4003/admin/event/${eventId}`, { withCredentials: true });
                if (response.data.success) {
                    alert('Event deleted successfully');
                    fetchEvents(); // Refresh the list
                }
            } catch (error) {
                console.error('Error deleting event:', error);
                alert('Failed to delete event');
            } finally {
                setLoading(false);
            }
        }
    };

    if (loading) {
        return <div>Loading events...</div>;
    }

    return (
        <>
            <AdminNavbar data-aos="fade-up" data-aos-duration="3000" />
            <div style={styles.container}>
                <h1 style={styles.title}>Manage <span style={styles.highlight}>Events</span></h1>

                <div style={styles.eventsGrid}>
                    {events.map((event) => (
                        <div key={event._id} style={styles.eventCard} data-aos="fade-up">
                            <img
                                src={event.poster}
                                alt={event.title}
                                style={styles.eventImage}
                            />

                            <div style={styles.eventInfo}>
                                <h3 style={styles.eventTitle}>{event.title}</h3>

                                <p style={styles.eventDate}>
                                    {new Date(event.eventDate).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </p>

                                <p style={styles.eventDesc}>
                                    {event.desc?.length > 100
                                        ? `${event.desc.substring(0, 100)}...`
                                        : event.desc}
                                </p>

                                <div style={styles.buttonGroup}>
                                    <button
                                        onClick={() => navigate(`/admin/event/${event._id}`)}
                                        style={styles.viewButton}
                                    >
                                        Edit Event
                                    </button>

                                    <button
                                        onClick={() => handleDelete(event._id)}
                                        style={styles.deleteButton}
                                    >
                                        Delete Event
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

const ViewEvents = () => {
    const [loading, setLoading] = useState(true);

    const handleFinishLoading = () => {
        setLoading(false);
    };

    return (
        <div className="App">
            {loading ? <Loader onFinish={handleFinishLoading} /> : <MainPage />}
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        marginTop: '2rem',  // Added margin to account for navbar
    },
    title: {
        fontSize: '2.5rem',
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#333',
    },
    highlight: {
        color: '#ff4444',
    },
    eventsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem',
        padding: '1rem',
    },
    eventCard: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        transition: 'transform 0.3s ease',
    },
    eventImage: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
    },
    eventInfo: {
        padding: '1rem',
    },
    eventTitle: {
        fontSize: '1.3rem',
        marginBottom: '0.5rem',
        color: '#333',
    },
    eventDate: {
        color: '#666',
        fontSize: '0.9rem',
        marginBottom: '0.5rem',
    },
    eventDesc: {
        color: '#555',
        fontSize: '0.9rem',
        marginBottom: '1rem',
    },
    buttonGroup: {
        display: 'flex',
        gap: '1rem',
        marginTop: 'auto',
    },
    viewButton: {
        flex: 1,
        padding: '0.5rem 1rem',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    deleteButton: {
        flex: 1,
        padding: '0.5rem 1rem',
        backgroundColor: '#ff4444',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
};

export default ViewEvents;