import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';

const EditEvent = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false); // New state for update button
    const [event, setEvent] = useState({
        title: '',
        eventDate: '',
        desc: '',
        poster: '',
        posterPreview: ''
    });

    useEffect(() => {
        fetchEvent();
    }, [eventId]);

    const fetchEvent = async () => {
        try {
            console.log("Getting eventID: ", eventId);
            const response = await axios.get(`http://localhost:4003/admin/event/${eventId}`, { withCredentials: true });
            if (response.data.success) {
                const eventData = response.data.event;
                setEvent({
                    ...eventData,
                    eventDate: new Date(eventData.eventDate).toISOString().split('T')[0],
                    posterPreview: eventData.poster
                });
            }
        } catch (error) {
            console.error('Error fetching event:', error);
            alert('Failed to load event details');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEvent(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEvent(prev => ({
                    ...prev,
                    posterPreview: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsUpdating(true); // Set updating state to true
            
            const formData = new FormData();
            formData.append('title', event.title);
            formData.append('eventDate', event.eventDate);
            formData.append('desc', event.desc);

            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput.files[0]) {
                formData.append('poster', fileInput.files[0]);
            }

            const response = await axios.put(
                `http://localhost:4003/admin/event/${eventId}`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (response.data.success) {
                alert('Event updated successfully');
                navigate('/admin/events');
            }
        } catch (error) {
            console.error('Error updating event:', error);
            alert('Failed to update event');
        } finally {
            setIsUpdating(false); // Reset updating state
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <AdminNavbar />
            <div style={styles.container}>
                <h1 style={styles.title}>Edit <span style={styles.highlight}>Event</span></h1>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label htmlFor="title" style={styles.label}>Event Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={event.title}
                            onChange={handleInputChange}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label htmlFor="eventDate" style={styles.label}>Event Date</label>
                        <input
                            type="date"
                            id="eventDate"
                            name="eventDate"
                            value={event.eventDate}
                            onChange={handleInputChange}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label htmlFor="desc" style={styles.label}>Description</label>
                        <textarea
                            id="desc"
                            name="desc"
                            value={event.desc}
                            onChange={handleInputChange}
                            style={styles.textarea}
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label htmlFor="poster" style={styles.label}>Event Poster</label>
                        <input
                            type="file"
                            id="poster"
                            name="poster"
                            onChange={handleImageChange}
                            accept="image/*"
                            style={styles.fileInput}
                        />
                        {event.posterPreview && (
                            <img
                                src={event.posterPreview}
                                alt="Event poster preview"
                                style={styles.posterPreview}
                            />
                        )}
                    </div>

                    <div style={styles.buttonGroup}>
                        <button 
                            type="submit" 
                            style={{
                                ...styles.submitButton,
                                opacity: isUpdating ? 0.7 : 1,
                                cursor: isUpdating ? 'not-allowed' : 'pointer'
                            }}
                            disabled={isUpdating}
                        >
                            {isUpdating ? 'Updating...' : 'Update Event'}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/admin/events')}
                            style={styles.cancelButton}
                            disabled={isUpdating}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

const styles = {
    // ... (all previous styles remain the same)
    container: {
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
        marginTop: '2rem',
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
    form: {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    formGroup: {
        marginBottom: '1.5rem',
    },
    label: {
        display: 'block',
        marginBottom: '0.5rem',
        color: '#333',
        fontSize: '1rem',
    },
    input: {
        width: '100%',
        padding: '0.75rem',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '1rem',
    },
    textarea: {
        width: '100%',
        padding: '0.75rem',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '1rem',
        minHeight: '150px',
        resize: 'vertical',
    },
    fileInput: {
        width: '100%',
        padding: '0.75rem',
        marginBottom: '1rem',
    },
    posterPreview: {
        width: '100%',
        maxHeight: '300px',
        objectFit: 'contain',
        marginTop: '1rem',
        borderRadius: '4px',
    },
    buttonGroup: {
        display: 'flex',
        gap: '1rem',
        marginTop: '2rem',
    },
    submitButton: {
        flex: 1,
        padding: '0.75rem',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: 'all 0.3s ease',
    },
    cancelButton: {
        flex: 1,
        padding: '0.75rem',
        backgroundColor: '#ff4444',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: 'background-color 0.3s ease',
    },
};

export default EditEvent;