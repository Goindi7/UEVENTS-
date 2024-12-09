import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import Loader from './Loader';
import AdminNavbar from './AdminNavbar';

const MainPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    organizer: 'Chitkara University Punjab',
    eventDate: '',
  });
  const [posterFile, setPosterFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPosterFile(file);
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create FormData instance for multipart/form-data
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('desc', formData.desc);
      submitData.append('organizer', formData.organizer);
      submitData.append('eventDate', formData.eventDate);
      submitData.append('poster', posterFile);

      const response = await axios.post(
        'http://localhost:4003/admin/add-event',
        submitData,
        { withCredentials: true },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        alert('Event added successfully!');
        navigate('/admin/events');
      }
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Failed to add event: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNavbar data-aos="fade-up" data-aos-duration="3000" />
      <div style={styles.container}>
        <h1 style={styles.title}>Add New <span style={styles.highlight}>Event</span></h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Event Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              style={styles.input}
              required
              placeholder="Enter event title"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Description</label>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              style={styles.textarea}
              required
              placeholder="Enter event description"
              rows="4"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Organizer</label>
            <input
              type="text"
              name="organizer"
              value={formData.organizer}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Event Date</label>
            <input
              type="datetime-local"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Event Poster</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={styles.fileInput}
              required
            />
            {previewUrl && (
              <div style={styles.imagePreview}>
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={styles.previewImage}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            style={styles.submitButton}
            disabled={loading}
          >
            {loading ? 'Adding Event...' : 'Add Event'}
          </button>
        </form>
      </div>
    </>
  );
};

const AddEvent = () => {
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
  inputGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#333',
    fontWeight: '500',
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
    resize: 'vertical',
  },
  fileInput: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
  },
  imagePreview: {
    marginTop: '1rem',
    maxWidth: '300px',
    margin: '0 auto',
  },
  previewImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  submitButton: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#ff4444',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default AddEvent;