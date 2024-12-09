import React from 'react';
import './Footer.css'; 
import FooterColumn from './FooterColumn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

import logo from '../assets/images/logo.png';

const Footer = () => {
  const footerData = [
    {
      title: 'Navigation',
      items: [
        { name: 'Home', link: '/' },
        { name: 'About Us', link: '#mainabout' },
        { name: 'What We Do', link: '#what-we-do' },
        { name: 'To The Power of 10', link: '#power-of-10' },
        { name: 'Donate', link: '#donate' }
      ]
    },
    {
      title: 'What We Do',
      items: [
        { name: 'Build side Projects', link: '#testing' },
        { name: 'Networking events', link: '#advocacy' },
        { name: 'Expert talks', link: '#information' },
        { name: 'Building Leadership', link: '#leadership' },
        { name: 'Engaging With Global Fund', link: '#global-fund' },
        { name: 'Shining a Light', link: '#shining-light' }
      ]
    },
    {
      title: 'Legal',
      items: [
        { name: 'General Info', link: '#general-info' },
        { name: 'Privacy Policy', link: '#privacy-policy' },
        { name: 'Terms of Service', link: '#terms-of-service' }
      ]
    },
    {
      title: 'Talk To Us',
      items: [
        { name: 'uevents@gmail.com', link: 'mailto:support@ercom.com' },
        { name: '+91 8694016666', link: 'tel:+6623991145' },
        { name: 'Contact Us', link: '#contact' },
        { name: 'Facebook', link: 'https://www.facebook.com' },
        { name: 'LinkedIn', link: 'https://www.linkedin.com' },
        { name: 'Twitter', link: 'https://www.twitter.com' }
      ]
    }
  ];

  // Function to handle click and navigate to social media links
  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="content">
          {footerData.map((column, index) => (
            <FooterColumn key={index} title={column.title} items={column.items} />
          ))}
        </div>
        <div className="divider" />
        <div className="bottomSection">
          <img src={logo} alt="Company Logo" className="logo" />
          <p>© 2024 Uevents ~ Made By Manpreet Singh Goindi and Parth Thakur</p>
          <div className="socialIcons">
            <div
              className="socialLink iconCircle"
              onClick={() => handleSocialClick('https://www.linkedin.com')}
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </div>
            <div
              className="socialLink iconCircle"
              onClick={() => handleSocialClick('https://www.twitter.com')}
            >
              <FontAwesomeIcon icon={faTwitter} />
            </div>
            <div
              className="socialLink iconCircle"
              onClick={() => handleSocialClick('https://www.instagram.com')}
            >
              <FontAwesomeIcon icon={faInstagram} />
            </div>
            <div
              className="socialLink iconCircle"
              onClick={() => handleSocialClick('https://www.youtube.com')}
            >
              <FontAwesomeIcon icon={faYoutube} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
