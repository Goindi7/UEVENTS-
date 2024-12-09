import React, { useState } from 'react';
import './EventDropdown.css';
import arrow from '../assets/images/Arrow.png';
const EventDropdown = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button className="dropdownButton" onClick={toggleDropdown}>
        <img src={arrow}/>
      </button>
      {isOpen && (
        <div className="dropdownContent">
          <div onClick={() => handleSelect('upcoming')} className="dropdownItem">
            Upcoming Events
          </div>
          <div onClick={() => handleSelect('past')} className="dropdownItem">
            Past Events
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDropdown;
