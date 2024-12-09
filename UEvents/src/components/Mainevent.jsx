import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EventDropdown from './EventDropdown';

const Mainevent = () => {
  const [selectedOption, setSelectedOption] = useState('upcoming');
  const [events, setEvents] = useState({
    upcomingEvents: [],
    pastEvents: []
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const trimDescription = (desc, maxLength = 100) => {
    if (!desc) return '';
    if (desc.length <= maxLength) return desc;
    return `${desc.substr(0, maxLength).trim()}...`;
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:4003/events');
        const result = await response.json();

        if (result.success) {
          // Transform the date format to match your desired display format
          const transformedData = {
            upcomingEvents: result.data.upcomingEvents.map(event => ({
              id: event._id,
              title: event.title,
              date: new Date(event.eventDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              }),
              desc: trimDescription(event.desc),
              imageUrl: event.poster // Assuming the poster field contains the image URL
            })),
            pastEvents: result.data.pastEvents.map(event => ({
              id: event._id,
              title: event.title,
              date: new Date(event.eventDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              }),
              desc: event.desc,
              imageUrl: event.poster
            }))
          };
          setEvents(transformedData);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  if (loading) {
    return <div className="app">Loading events...</div>;
  }

  return (
    <div className="app" id='events'>
      <div className="header">
        <div className="headerText">Our <span className='reddo'>Events</span></div>
        <EventDropdown onSelect={handleOptionSelect} />
      </div>
      <div className="content">
        {selectedOption === 'upcoming' ? (
          <>
            <h2 className="eventTitle">Upcoming Events</h2>
            <div className="eventsGrid">
              {events.upcomingEvents.map((event, index) => (
                <div key={index} className="eventCard">
                  <img src={event.imageUrl} alt={event.title} className="eventImage" />
                  <h3>{event.title}</h3>
                  <p>{event.date}</p>
                  <p>{event.desc}</p>
                  <button
                    onClick={() => navigate(`/registerev/${event.id}`, {
                      state: { upcomingEvents: events.upcomingEvents }
                    })}
                    className="registerButton"
                  >
                    Register
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="eventTitle">Past Events</h2>
            <div className="eventsGrid">
              {events.pastEvents.map((event, index) => (
                <div key={index} className="eventCard">
                  <img src={event.imageUrl} alt={event.title} className="eventImage" />
                  <h3>{event.title}</h3>
                  <p>{event.date}</p>
                  <p>{event.desc}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Mainevent;