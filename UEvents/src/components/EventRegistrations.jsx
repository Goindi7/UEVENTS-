import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';

const EventRegistrations = () => {
    const [events, setEvents] = useState([]);
    const [selectedEventId, setSelectedEventId] = useState('');
    const [selectedEventData, setSelectedEventData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchLoading, setSearchLoading] = useState(false);

    useEffect(() => {
        // Fetch all events when the component mounts
        const fetchAllEvents = async () => {
            try {
                const response = await axios.get('http://localhost:4003/admin/events-with-users', { withCredentials: true });
                if (response.data.success && response.data.events) {
                    setEvents(response.data.events);
                } else {
                    console.error('Unexpected response format:', response.data);
                    alert('Failed to load events. Please try again later.');
                }
            } catch (error) {
                console.error('Error fetching events:', error);
                alert('Failed to fetch events. Please check your network connection.');
            } finally {
                setLoading(false);
            }
        };

        fetchAllEvents();
    }, []);

    const handleSearch = async () => {
        if (!selectedEventId) {
            alert('Please select an event first');
            return;
        }

        try {
            setSearchLoading(true);
            const response = await axios.get(`http://localhost:4003/admin/event/registered/${selectedEventId}`, { withCredentials: true });
            if (response.data.success && response.data.data) {
                setSelectedEventData(response.data.data);
            } else {
                console.error('Unexpected response format:', response.data);
                alert('No registrations found for this event.');
            }
        } catch (error) {
            console.error('Error fetching event details:', error);
            alert('Failed to load event details. Please try again.');
        } finally {
            setSearchLoading(false);
        }
    };

    if (loading) {
        return <div>Loading events...</div>;
    }

    return (
        <>
            <AdminNavbar />
            <div style={styles.container}>
                <h1 style={styles.title}>Event <span style={styles.highlight}>Registrations</span></h1>

                <div style={styles.filterSection}>
                    <label htmlFor="eventFilter" style={styles.label}>Select Event:</label>
                    <select
                        id="eventFilter"
                        value={selectedEventId}
                        onChange={(e) => setSelectedEventId(e.target.value)}
                        style={styles.select}
                    >
                        <option value="">Select an event</option>
                        {events.map((event) => (
                            <option key={event._id} value={event._id}>
                                {event.title}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleSearch}
                        style={styles.searchButton}
                        disabled={!selectedEventId || searchLoading}
                    >
                        {searchLoading ? 'Searching...' : 'Search for Registered Students'}
                    </button>
                </div>

                {selectedEventData && (
                    <div style={styles.eventSection}>
                        <div style={styles.eventHeader}>
                            <h2 style={styles.eventTitle}>{selectedEventData.event.title}</h2>
                            <span style={styles.registrationCount}>
                                {selectedEventData.registeredUsers.length} Registrations
                            </span>
                        </div>

                        {selectedEventData.registeredUsers.length === 0 ? (
                            <p style={styles.noRegistrations}>No registrations for this event yet.</p>
                        ) : (
                            <div style={styles.tableContainer}>
                                <table style={styles.table}>
                                    <thead>
                                        <tr>
                                            <th style={styles.th}>Name</th>
                                            <th style={styles.th}>Department</th>
                                            <th style={styles.th}>Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedEventData.registeredUsers.map((user, index) => (
                                            <tr key={index} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                                                <td style={styles.td}>{user.name}</td>
                                                <td style={styles.td}>{user.department}</td>
                                                <td style={styles.td}>{user.email}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

const styles = {
    container: {
        padding: '2rem',
        maxWidth: '1200px',
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
    filterSection: {
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    label: {
        fontSize: '1rem',
        color: '#333',
    },
    select: {
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '1rem',
        minWidth: '200px',
    },
    searchButton: {
        padding: '0.5rem 1rem',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        transition: 'background-color 0.3s ease',
    },
    eventSection: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '2rem',
        overflow: 'hidden',
    },
    eventHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 1.5rem',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #eee',
    },
    tableContainer: {
        overflowX: 'auto',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        minWidth: '600px',
    },
    th: {
        padding: '1rem',
        textAlign: 'left',
        backgroundColor: '#f8f9fa',
        borderBottom: '2px solid #dee2e6',
        color: '#333',
        fontWeight: 'bold',
    },
    td: {
        padding: '1rem',
        borderBottom: '1px solid #dee2e6',
    },
    evenRow: {
        backgroundColor: '#fff',
    },
    oddRow: {
        backgroundColor: '#f8f9fa',
    },
    noRegistrations: {
        padding: '2rem',
        textAlign: 'center',
        color: '#666',
        fontStyle: 'italic',
    },
};

export default EventRegistrations;
